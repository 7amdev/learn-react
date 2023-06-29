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

function sort (data_arr) {
    return data_arr.sort(function (a, b) {
        const name_a = a.name.toUpperCase();
        const name_b = b.name.toUpperCase();

        if ( name_a > name_b) return 1;
        if ( name_a < name_b) return -1;

        return 0;
    });
};


module.exports = { 
    generate_uid, 
    sort 
};
