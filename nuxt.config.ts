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
            title: 'Tanguy Le Goff',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Tanguy Le Goff - Fullstack web Developer',
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
        '@nuxtjs/i18n',
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

    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.yml'
            },
            {
                code: 'fr',
                name: 'Français',
                file: 'fr.yml'
            }
        ],
        lazy: false, // Active le chargement paresseux des fichiers de langue
        langDir: 'locales/', // Répertoire où se trouvent les fichiers de langue
        defaultLocale: 'fr', // Définit la langue par défaut
        strategy: 'no_prefix', // Pas de préfixe d'URL pour les langues
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            alwaysRedirect: true,
            fallbackLocale: 'en' // Locale fallback si détection échoue
        }
    }
})