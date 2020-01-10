const KEY_PREFIX = "MQ_STYLES_";

const randKey = () =>
  Math.random()
    .toString(36)
    .slice(2);

export const getMediaQueryKey = () => `${KEY_PREFIX}${randKey()}`;

export const isMediaQueryProp = (propName: string) =>
  propName.indexOf(KEY_PREFIX) === 0;
