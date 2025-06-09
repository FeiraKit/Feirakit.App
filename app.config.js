const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.fsvj.feirakit.dev';
  }

  if (IS_PREVIEW) {
    return 'com.fsvj.feirakit.preview';
  }

  return 'com.fsvj.feirakit';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'FeiraKit(Dev)';
  }

  if (IS_PREVIEW) {
    return 'FeiraKit (Preview)';
  }

  return 'FeiraKit';
};

const getAppIcon = () => {
  if (IS_DEV) {
    return './assets/devicon.png';
  }

  return './assets/icon.png';
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  icon: getAppIcon(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
