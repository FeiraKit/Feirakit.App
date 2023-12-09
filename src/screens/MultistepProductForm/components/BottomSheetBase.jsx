import React, { forwardRef, useState } from 'react'
import { VStack, useTheme } from 'native-base'
import BottomSheet from '@gorhom/bottom-sheet'

const BottomSheetBase = forwardRef(({ children, PanDownToClose }, ref) => {
  const { colors } = useTheme()
  const snapPoints = ['30%', '75%']

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
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={PanDownToClose}
    >
      {children}
    </BottomSheet>
  )
})
export default BottomSheetBase
