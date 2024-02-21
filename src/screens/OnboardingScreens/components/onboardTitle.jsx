import React from 'react';
import { Heading, useTheme } from 'native-base';

export function OnboardTitle({ title }) {
  const { colors } = useTheme();
  return (
    <Heading
      fontSize={25}
      mt={4}
      ml={4}
      color={colors.black[500]}
      alignSelf="center"
      maxW="90%"
      textBreakStrategy="simple"
      textAlign="center"
    >
      {title}
    </Heading>
  );
}
