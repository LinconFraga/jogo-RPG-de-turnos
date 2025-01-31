// howler.d.ts
declare module 'howler' {
    class Howl {
        constructor(options: {
            src: string[];
            loop?: boolean;
            volume?: number;
        });
        play(): void;
        stop(): void;
        pause(): void;
    }

    export { Howl };
}