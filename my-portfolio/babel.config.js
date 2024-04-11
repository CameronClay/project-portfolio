//needed for jest
//bable converts typescript to javascript
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
        "next/babel"
    ]
}