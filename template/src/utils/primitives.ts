import { tv } from 'tailwind-variants'

export const title = tv({
    base: 'tracking-tight inline font-semibold',
    variants: {
        color: {
            violet: 'from-[#ff1cf7] to-[#b249f8]',
            yellow: 'from-[#ff705b] to-[#ffb457]',
            blue: 'from-[#5ea2ef] to-[#0072f5]',
            cyan: 'from-[#00b7fa] to-[#01cfea]',
            green: 'from-[#6fee8d] to-[#17c964]',
            pink: 'from-[#ff72e1] to-[#f54c7a]',
            foreground: 'dark:from-[#ffffff] dark:to-[#4b4b4b]',
        },
        size: {
            rem: 'text-4',
            sm: 'text-3xl lg:text-4xl',
            md: 'text-[2.3rem] lg:text-5xl leading-9',
            lg: 'text-4xl lg:text-6xl',
        },
        fullWidth: {
            true: 'w-full block',
        },
    },
    defaultVariants: {
        size: 'md',
    },
    compoundVariants: [
        {
            color: ['violet', 'yellow', 'blue', 'cyan', 'green', 'pink', 'foreground'],
            class: 'bg-clip-text text-transparent bg-gradient-to-b',
        },
    ],
})

export const subtitle = tv({
    base: 'w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full',
    variants: {
        fullWidth: {
            true: '!w-full',
        },
    },
    defaultVariants: {
        fullWidth: true,
    },
})
