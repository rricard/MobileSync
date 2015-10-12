declare module fs {
  declare function statAsync(pt: string): Promise;
  declare function readdirAsync(pt: string): Promise<string>;
};
