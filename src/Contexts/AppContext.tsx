import React, {createContext, useContext, useState} from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import {userStoreService} from '../Service/StoreService';
import UserService from '../Service/UserService';

const defaultContext = {
  totalImageToUpload: 0,
  totalUploadedImage: 0,
  activeStores: [] as string[],
  uploadImages: (images: Array<string>, storeId: string) => {},
};

const _Context = createContext(defaultContext);

export const useAppContext = () => useContext(_Context);

type Props = {
  children: React.ReactNode;
};
export function AppContext(props: Props) {
  const [totalImageToUpload, setTotalImageToUpload] = useState(0);
  const [totalUploadedImage, setTotalUploadedImage] = useState(0);
  const [activeStores, setActiveStores] = useState<Array<string>>([]);
  const [uploadFailed, setUploadFailed] = useState(false);

  const onUploadEachImage = (url: string, storeId: string) => {
    const currentUserId = UserService.getCurrentUser()?.uid!;
    userStoreService.updateImageUrl(currentUserId, storeId, url);
  };

  const uploadImages = (images: Array<string>, storeId: string) => {
    const currentUserId = UserService.getCurrentUser()?.uid!;
    setActiveStores(activeStores.concat(storeId));
    setTotalImageToUpload(images.length);
    setTotalUploadedImage(0);
    setUploadFailed(false);

    let totalImageToUpload = 0;

    images.forEach(uri => {
      const imageName = Date.now();
      const uploadTask = storage()
        .ref(`pulse/images/${imageName}`)
        .putFile(uri);

      uploadTask.on(
        'state_changed',
        null,
        error => {
          ToastAndroid.show('Image Upload Failed', ToastAndroid.BOTTOM);
          setUploadFailed(true);
        },
        async () => {
          totalImageToUpload++;
          setTotalUploadedImage(count => count + 1);
          if (totalImageToUpload >= images.length) {
            userStoreService.updateStoreVisitTime(currentUserId, storeId);
            setActiveStores(activeStores.filter(id => id != storeId));
          }
          const link = await uploadTask.snapshot?.ref.getDownloadURL();
          link && onUploadEachImage(link, storeId);
        },
      );
    });
  };

  return (
    <_Context.Provider
      value={{
        totalImageToUpload,
        totalUploadedImage,
        uploadImages,
        activeStores,
      }}>
      {props.children}
      {totalUploadedImage != totalImageToUpload && (
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={48}
            indeterminate={uploadFailed ? false : true}
            borderColor={uploadFailed ? 'red' : 'blue'}
            progress={totalUploadedImage / totalImageToUpload}
            borderWidth={3}
          />
          <Text style={styles.progressText}>
            {totalUploadedImage}/{totalImageToUpload}
          </Text>
        </View>
      )}
    </_Context.Provider>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    bottom: 30,
    right: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {position: 'absolute', fontWeight: 'bold'},
});
