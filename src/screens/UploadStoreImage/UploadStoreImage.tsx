import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import {NativeScreenProps} from '../../types';
import {PulseButton, ScreenContainer} from '../../GlobalComponents';
import {useAppContext} from '../../Contexts/AppContext';
import {userStoreService} from '../../Service/StoreService';
import UserService from '../../Service/UserService';

export function UploadStoreImages(
  props: NativeScreenProps<'UploadStoreImages'>,
) {
  const {width} = useWindowDimensions();
  const {activeStores, uploadImages} = useAppContext();

  const [images, setImages] = useState<Array<string>>([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    (async () => {
      const userID = UserService.getCurrentUser()?.uid!;
      const visitTime = await userStoreService.getStoreVisitTime(
        userID,
        props.route.params.storeId,
      );
      if (new Date(visitTime).toDateString() == new Date().toDateString()) {
        setImageUploaded(true);
      }
    })();
  }, [activeStores.length]);

  const pickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      selectionLimit: 5 - images.length,
    });
    if (result.assets) {
      setImages(images.concat(result.assets.map(asset => asset.uri!)));
    }
  };

  const launchCameraPressed = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      cameraType: 'back',
    });
    if (result.assets) {
      setImages(images.concat(result.assets.map(asset => asset.uri!)));
    }
  };

  const pushImageToServer = async () => {
    if (images.length) uploadImages(images, props.route.params.storeId);
  };

  const onImageRemovePressed = (index: number) => {
    setImages(images.filter((_, i) => i != index));
  };

  const imageSize = (width - 16) / 4 - 16;
  const isStoreActive = activeStores.includes(props.route.params.storeId);
  return (
    <ScreenContainer
      canGoback
      navigationTitle={props.route.params.storeTitle}
      noDefaultPadding>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={`image-key-${index}`}>
            <Image
              source={{uri}}
              style={{
                width: imageSize,
                height: imageSize,
                margin: 8,
                borderRadius: 8,
              }}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => onImageRemovePressed(index)}>
              <Icon name="close" size={22} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {imageUploaded ? (
        <View style={styles.doneContainer}>
          <Icon name="checkmark-done-sharp" size={35} color={'green'} />
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
            Image has been uploaded for today
          </Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              justifyContent: 'space-evenly',
            }}>
            <PulseButton
              disabled={!(5 - images.length)}
              onPress={launchCameraPressed}
              title="Capture Images (max 5)"
            />
            <PulseButton
              disabled={!(5 - images.length)}
              onPress={pickImages}
              title="Pick Images (max 5)"
            />
          </View>

          <PulseButton
            onPress={pushImageToServer}
            title={isStoreActive ? 'Images uploading' : 'Upload Images'}
            isLoading={isStoreActive}
            style={{backgroundColor: 'green'}}
          />
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 2,
    marginTop: 12,
    paddingHorizontal: 8,
  },
  closeBtn: {
    position: 'absolute',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    top: -5,
    left: -5,
  },
  buttonContainer: {flex: 1, paddingHorizontal: 12},
  doneContainer: {flex: 1, paddingHorizontal: 12, alignItems: 'center'},
});
