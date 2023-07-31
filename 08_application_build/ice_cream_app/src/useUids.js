import { useRef } from "react";

const generate_uid = function () {
  const seed = 'abcdefghijklmnopqrstuvwxyz01234567890!@#$%&-_+=';
  const lower_bound = 0;
  const upper_bound = seed.length;
  const N = 7;
  let uid = '';

  for (let i = 0; i < N; i += 1) {
      const seed_idx = Math.floor(
        Math.random() * (upper_bound - lower_bound) + lower_bound
      );
      uid += seed.charAt(seed_idx);
  }

  return uid;
} 

const useUids = function (count) {
  const unique_ids = useRef(
    [...new Array(count)].map(function () {
      return generate_uid();
    })
  );

  return unique_ids.current;
};

export default useUids;