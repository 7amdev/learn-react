function generate_uid () {
    const seed = 'abcdefghijklmnopqrstuvwxyz01234567890!@#$%&-_+=';
    const upper_bound = seed.length;
    const lower_bound = 0;
    const N = 7;
    let uid = '';

    for (let i = 0; i < N; i += 1) {
        const seed_idx = Math.random() * (upper_bound - lower_bound) + lower_bound;
        uid += seed.charAt(seed_idx);
    }

    return uid;
}

module.exports = { generate_uid };
