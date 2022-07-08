export interface ISpacetraveling {
  spacetraveling: {
    banner: {
      url: string;
    };
    title: string;
    time: string;
    author: string;
    content: {
      id: string;
      heading: string;
      body: {
        html: string;
      };
    }[];
  };
}
