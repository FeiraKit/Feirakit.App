import React from 'react';
import {
  VStack,
  Skeleton,
  Center,
  HStack,
  useTheme,
  Progress,
  Heading,
  View,
  Image,
  Spinner,
} from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';

export function Loading() {
  return (
    <Center w="100%" pt={10}>
      <VStack w="90%" maxW="400" h="full" space={8} overflow="hidden" rounded="md">
        <Skeleton h="10" w={190} alignSelf="center" fadeDuration={0.2} />
        <Skeleton h="10" w="full" fadeDuration={0.2} fa />

        <HStack>
          <Skeleton h="10" w="2/3" pr={2} fadeDuration={0.2} />
          <Skeleton h="10" w="1/3" fadeDuration={0.2} />
        </HStack>
        <Skeleton.Text mt={-4} lines={1} w="1/2" fontSize="md" fadeDuration={1.5} />

        <HStack>
          <Skeleton rounded="md" height={230} w={180} mr={4} fadeDuration={0.4} />
          <Skeleton rounded="md" height={230} w={180} fadeDuration={0.4} />
        </HStack>
        <HStack>
          <Skeleton rounded="md" height={230} w={180} mr={4} fadeDuration={0.4} />
          <Skeleton rounded="md" height={230} w={180} fadeDuration={0.4} />
        </HStack>
        <HStack>
          <Skeleton rounded="md" height={230} w={180} mr={4} fadeDuration={0.4} />
          <Skeleton rounded="md" height={230} w={180} fadeDuration={0.4} />
        </HStack>
      </VStack>
    </Center>
  );
}

export function LoadingProducts() {
  return (
    <Center w="100%" pt={10}>
      <Skeleton h="8" w="58%" alignSelf="flex-start" fadeDuration={1.0} />
      <VStack zIndex={1} w="100%" maxW="400" h="full" space={8} overflow="hidden" rounded="md">
        <Skeleton.Text mt={-4} lines={1} w="1/2" fontSize="md" fadeDuration={1.0} />

        <HStack>
          <Skeleton rounded="md" height={230} w={180} mr={4} fadeDuration={0.4} />
          <Skeleton rounded="md" height={230} w={180} fadeDuration={0.4} />
        </HStack>
        <HStack>
          <Skeleton rounded="md" height={230} w={180} mr={4} fadeDuration={0.4} />
          <Skeleton rounded="md" height={230} w={180} fadeDuration={0.4} />
        </HStack>
        <HStack>
          <Skeleton rounded="md" height={230} w={180} mr={4} fadeDuration={0.4} />
          <Skeleton rounded="md" height={230} w={180} fadeDuration={0.4} />
        </HStack>
      </VStack>
    </Center>
  );
}

export function LoadingImage() {
  return (
    <>
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
      <Skeleton w={50} h={50} mr={2} />
    </>
  );
}

export function LoadingForm() {
  return (
    <Center w="98%" alignSelf="center" alignItems="center" justifyContent="center" mt={10}>
      <VStack
        zIndex={1}
        w="100%"
        maxW="400"
        h="full"
        mt={4}
        space={8}
        overflow="hidden"
        rounded="md"
        alignItems="center"
        marginTop={10}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            // eslint-disable-next-line react/no-array-index-key
            key={`skeleton${index}`}
            rounded="8"
            h={12}
            mt={20}
            w="100%"
            alignSelf="center"
            fadeDuration={0.9}
          />
        ))}
      </VStack>
    </Center>
  );
}

export function LoadingEditForm() {
  const { colors } = useTheme();
  return (
    <Center
      w="98%"
      alignSelf="center"
      alignItems="center"
      justifyContent="space-around"
      mt={20}
      height="full"
    >
      <VStack
        zIndex={100}
        w="100%"
        maxW="400"
        h="full"
        mt={4}
        space={2}
        overflow="hidden"
        rounded="md"
        alignItems="center"
      >
        <Skeleton
          rounded="8"
          h={12}
          mt={8}
          w="100%"
          alignSelf="center"
          bg={colors.gray[200]}
          fadeDuration={0.6}
        />

        <HStack space="2%">
          <Skeleton
            rounded="8"
            h={12}
            bg={colors.gray[250]}
            mt={8}
            w="48%"
            alignSelf="center"
            fadeDuration={0.6}
          />
          <Skeleton
            rounded="8"
            h={12}
            mt={8}
            bg={colors.gray[250]}
            w="48%"
            alignSelf="center"
            fadeDuration={0.6}
          />
        </HStack>
        <HStack mt={8} space="2%">
          <Skeleton
            rounded="8"
            h={12}
            mt={8}
            bg={colors.gray[250]}
            w="48%"
            alignSelf="center"
            fadeDuration={0.6}
          />
          <Skeleton
            rounded="8"
            h={12}
            mt={8}
            w="48%"
            bg={colors.gray[250]}
            alignSelf="center"
            fadeDuration={0.6}
          />
        </HStack>

        <Skeleton
          rounded="8"
          h={20}
          mt={20}
          w="100%"
          bg={colors.gray[250]}
          alignSelf="center"
          fadeDuration={0.6}
        />

        <Skeleton
          rounded="8"
          h={40}
          mt={20}
          w="100%"
          bg={colors.gray[250]}
          alignSelf="center"
          fadeDuration={0.6}
        />
      </VStack>
    </Center>
  );
}

export function LoadingUploadImages({ percent }) {
  const { colors } = useTheme();
  return (
    <VStack
      alignItems="center"
      alignSelf="center"
      position="absolute"
      justifyContent="space-evenly"
      zIndex={100}
      bg={colors.gray[120]}
      w="full"
      h="full"
    >
      <Image
        mt="-20%"
        // eslint-disable-next-line global-require
        source={require('../assets/logo.png')}
        alt="logo do Feira kit"
        style={{ width: 300, height: 90 }}
        resizeMode="contain"
        alignSelf="center"
      />
      <View w="80%">
        <Heading fontSize={RFValue(18)} color={colors.blue[700]} alignSelf="center">
          Fazendo Upload do Produto
        </Heading>
        <Progress value={percent} size="2xl" mb={4} mt="1.5" />
      </View>

      <Heading fontSize={RFValue(20)} color={colors.blue[700]} alignSelf="center">
        {percent > 100 ? 100 : percent}%
      </Heading>
    </VStack>
  );
}

export function FooterListLoader({ fetchingProducts }) {
  const { colors } = useTheme();

  return (
    <View>
      {fetchingProducts && <Spinner style={{ marginTop: 20 }} size={30} color={colors.blue[600]} />}
    </View>
  );
}
