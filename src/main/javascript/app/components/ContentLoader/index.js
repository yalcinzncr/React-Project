import React from 'react';
import img from 'resources/img/img';
import { Segment, Image, Dimmer, Loader } from '*****-ui-components';

const ContentLoader = () => (
  <Segment basic>
    <Dimmer active inverted>
      <Loader inverted />
    </Dimmer>

    <Image src={img.shortParagraph} />
  </Segment>
);

export default ContentLoader;
