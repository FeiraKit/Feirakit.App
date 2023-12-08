import React, { forwardRef, useState } from 'react'
import { VStack, useTheme } from 'native-base'

const BottomSheetBase = forwardRef(({ ref, children }) => {
  const { colors } = useTheme()
  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: colors.gray[50] }}
      handleIndicatorStyle={{ backgroundColor: colors.gray[400] }}
      handleStyle={{
        borderColor: colors.gray[400],
        borderWidth: 2,
        borderBottomWidth: 0,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={true}
      onClose={() => setIsSheetOpen[false]}
    >
      {children}
    </BottomSheet>
  )
})
export default BottomSheetBase
