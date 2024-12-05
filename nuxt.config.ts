export default defineNuxtConfig({
    devtools: {enabled: true},
    nitro: {
        preset: 'vercel',
    },
    compatibilityDate: '2024-08-18',
    build: {
        transpile: ['@popperjs/core'],
    },
    app: {
        // head
        head: {
            title: 'nuitinfo',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {
                    hid: 'description',
                    name: 'description',
                    content: 'ifno',
                },
            ],
            link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
        },
        pageTransition: {name: 'page', mode: 'out-in'},
    },

    // css
    css: ['~/assets/scss/index.scss', '@/assets/scss/scrollbar.scss'],

    typescript: {
        strict: true,
        shim: false,
    },

    // build modules
    modules: [
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@element-plus/nuxt',
        '@nuxtjs/color-mode',
    ],

    // vueuse
    vueuse: {
        ssrHandlers: true,
    },

    // colorMode
    colorMode: {
        classSuffix: '',
    },

    unocss: {
        uno: true,
        attributify: true,
        icons: {
            scale: 1.2,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
                },
            },
        },
    },
    elementPlus: {
        icon: 'ElIcon',
        importStyle: 'scss',
    },
})