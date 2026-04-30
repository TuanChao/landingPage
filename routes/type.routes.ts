import React, { ComponentClass, FunctionComponent } from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface IRouterData {
  path: string;
  layout?: FunctionComponent<LayoutProps> | ComponentClass<LayoutProps>;
  component?: FunctionComponent | ComponentClass;
  redirect?: string;
}
