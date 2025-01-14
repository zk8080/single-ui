import classNames from 'classnames';
import React, { EventHandler } from 'react';
import { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import { prefixCls } from '../../../util';
import Icon from '../icon';
import LazyLoad from 'react-lazyload';

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export interface ImageProps {
  /**
   * @description 图片链接
   */
  src: string;
  /**
   * @description 图片填充模式 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
   */
  fit?: ImageFit;
  /**
   * @description 替代文本
   */
  alt?: string;
  /**
   * @description 宽度，默认单位为px
   */
  width?: string;
  /**
   * @description 高度，默认单位为px
   */
  height?: string;
  /**
   * @description 圆角大小，默认单位为px
   */
  radius?: number;
  /**
   * @description 是否显示为圆形
   * @default false
   */
  round?: boolean;
  /**
   * @description 图片加载成功回调
   */
  onLoad?: (event?: React.FormEvent) => void;
  /**
   * @description 图片加载失败回调
   */
  onError?: (event?: React.FormEvent) => void;
  /**
   * @description 是否展示loading
   */
  showLoading?: boolean;
  /**
   * @description 是否展示加载失败
   */
  showError?: boolean;
  /**
   * @description 是否开启懒加载
   */
  lazyLoad?: boolean;
}

const Image: React.FC<ImageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    alt,
    width,
    height,
    src,
    fit,
    radius,
    round,
    onLoad,
    onError,
    showLoading,
    showError,
    lazyLoad,
  } = props;
  useEffect(() => {
    if (!src) {
      setError(true);
    }
  }, []);
  const classes = classNames(`${prefixCls}-image-wrap`, {
    [`${prefixCls}-image-wrap-round`]: round,
  });

  const imgWrapStyle = {
    width,
    height,
    borderRadius: round ? '50%' : radius,
  };

  const renderPlaceholder = () => {
    if (loading && showLoading) {
      return (
        <div className={`${prefixCls}-image-loading`}>
          <Icon icon="image" color="#969799" size="3x"></Icon>
        </div>
      );
    }
    if (error && showError) {
      return (
        <div className={`${prefixCls}-image-error`}>
          <Icon icon="sad-tear" color="#969799" size="3x"></Icon>
        </div>
      );
    }
  };
  const renderImage = () => {
    if (!src || error) return;
    const handleOnload = (event?: React.FormEvent) => {
      setLoading(false);
      onLoad && onLoad(event);
    };
    const handleOnError = (event?: React.FormEvent) => {
      setError(true);
      onError && onError(event);
    };
    const attrs = {
      alt,
      src,
      style: { objectFit: fit },
    };
    if (lazyLoad) {
      return (
        <LazyLoad scroll={true} offset={-20}>
          <img
            className={`${prefixCls}-image-img`}
            onError={handleOnError}
            onLoad={handleOnload}
            {...attrs}
          />
        </LazyLoad>
      );
    }
    return (
      <img
        className={`${prefixCls}-image-img`}
        onError={handleOnError}
        onLoad={handleOnload}
        {...attrs}
      />
    );
  };

  return (
    <div style={imgWrapStyle} className={classes}>
      {renderPlaceholder()}
      {renderImage()}
    </div>
  );
};

Image.defaultProps = {
  width: '90px',
  height: '90px',
  round: false,
  fit: 'fill',
  showLoading: false,
};

export default Image;
