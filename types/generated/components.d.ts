import type { Struct, Schema } from '@strapi/strapi';

export interface BlogText extends Struct.ComponentSchema {
  collectionName: 'components_blog_texts';
  info: {
    displayName: 'text';
    icon: 'cast';
    description: '';
  };
  attributes: {
    textContent: Schema.Attribute.Blocks;
  };
}

export interface BlogSplitContent extends Struct.ComponentSchema {
  collectionName: 'components_blog_split_contents';
  info: {
    displayName: 'split-content';
  };
  attributes: {
    heading: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageAlt: Schema.Attribute.String;
  };
}

export interface BlogListItems extends Struct.ComponentSchema {
  collectionName: 'components_blog_list_items';
  info: {
    displayName: 'listItems';
    icon: 'bulletList';
  };
  attributes: {
    listText: Schema.Attribute.String;
  };
}

export interface BlogListBlocks extends Struct.ComponentSchema {
  collectionName: 'components_blog_list_blocks';
  info: {
    displayName: 'list-block';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    listTitle: Schema.Attribute.String;
    listItem: Schema.Attribute.Component<'blog.list-items', true>;
  };
}

export interface BlogHeading3 extends Struct.ComponentSchema {
  collectionName: 'components_blog_heading3s';
  info: {
    displayName: 'heading3';
  };
  attributes: {
    heading3text: Schema.Attribute.String;
  };
}

export interface BlogHeading2 extends Struct.ComponentSchema {
  collectionName: 'components_blog_heading2s';
  info: {
    displayName: 'heading2';
  };
  attributes: {
    heading2text: Schema.Attribute.String;
  };
}

export interface BlogHeading1 extends Struct.ComponentSchema {
  collectionName: 'components_blog_heading1s';
  info: {
    displayName: 'heading1';
  };
  attributes: {
    heading1text: Schema.Attribute.String;
  };
}

export interface BlogHeaderImage extends Struct.ComponentSchema {
  collectionName: 'components_blog_header_images';
  info: {
    displayName: 'header-image';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    altText: Schema.Attribute.String;
    blogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    authorHeadshot: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    authorText: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.text': BlogText;
      'blog.split-content': BlogSplitContent;
      'blog.list-items': BlogListItems;
      'blog.list-blocks': BlogListBlocks;
      'blog.heading3': BlogHeading3;
      'blog.heading2': BlogHeading2;
      'blog.heading1': BlogHeading1;
      'blog.header-image': BlogHeaderImage;
    }
  }
}
