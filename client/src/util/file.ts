interface FileType {
    type: 'image' | 'video' | 'audio';
    extension: string;
}

export function getFileType(file: string): FileType | undefined {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const audioExtensions = ['mp3', 'wav', 'ogg'];
    
    const split = file.split('.');
    const extension = split[split.length - 1];

    if (imageExtensions.includes(extension)) return { type: 'image', extension } as FileType;
    if (videoExtensions.includes(extension)) return { type: 'video', extension } as FileType;
    if (audioExtensions.includes(extension)) return { type: 'audio', extension } as FileType;
}