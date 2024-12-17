type Features = {
  show_product_catalog: boolean;
  enable_product_management: boolean;
  show_feature_flag: boolean;
};

//mocked api 
const SAMPLE_FEATURES: Features = {
  show_product_catalog: false,
  enable_product_management: true,
  show_feature_flag: true,
};

const TTL = 10000;
type Cache = {
  featureFlags: Record<string, boolean>;
  timestamp: number | null;
};

let featureInstance: any = null;

const cache: Cache = {
  featureFlags: {}, 
  timestamp: null, 
};

//mocked api call
function fetchFeatureFlags(): Promise<Features> {
  console.log("BE calls");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_FEATURES);
    }, 100);
  });
}

function getFeatureState(
  featureName: keyof Features,
  defaultValue: boolean
): Promise<boolean> {
  const isKeyPresentinCache = Object.keys(cache.featureFlags).length;
  const presentTime = Date.now();
  if (
    cache.timestamp &&
    isKeyPresentinCache &&
    presentTime - cache.timestamp < TTL
  ) {
    console.log("from cache calls");
    const isEnabled = cache.featureFlags[featureName]
      ? cache.featureFlags[featureName]
      : defaultValue;
    return Promise.resolve(isEnabled);
  }
  if (featureInstance instanceof Promise) {
    console.log("from promise calls");
    return featureInstance.then((features) => {
      const isEnabled = features[featureName]
        ? features[featureName]
        : defaultValue;
      return isEnabled;
    });
  }
  featureInstance = fetchFeatureFlags()
    .then((features) => {
      cache.featureFlags = features;
      cache.timestamp = Date.now();

      const isEnabled = features[featureName]
        ? features[featureName]
        : defaultValue;
      return isEnabled;
    })
    .catch((error) => {
      console.error("Failed to fetch feature flags", error);
      return defaultValue;
    });
  return featureInstance;
}

//For testing purpose

// function testFeatureFlag() {
//   getFeatureState("show_product_catalog", false).then((isEnabled) => {
//     return isEnabled;
//   });
// }
// testFeatureFlag();

export default getFeatureState;
