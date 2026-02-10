import slugify from 'standard-slugify';

export const generateSlug = (text: string) => {
    return slugify(text);
};
