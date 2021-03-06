import THREE from 'three';
import LightDescriptorBase from './LightDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class PointLightDescriptor extends LightDescriptorBase {
  static defaultShadowCameraFov = 90;
  static defaultShadowCameraAspect = 1;

  constructor(react3Instance) {
    super(react3Instance);

    this.hasColor();

    [
      'intensity',
      'decay',
    ].forEach(propName => {
      this.hasProp(propName, {
        type: PropTypes.number,
        simple: true,
        default: 1,
      });
    });

    this.hasProp('distance', {
      type: PropTypes.number,
      simple: true,
      default: 0,
    });

    this.hasProp('shadowCameraFov', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.fov = value;
        }
      },
      default: PointLightDescriptor.defaultShadowCameraFov,
    });

    this.hasProp('shadowCameraAspect', {
      type: PropTypes.number,
      updateInitial: true,
      update(threeObject, value, hasProp) {
        if (hasProp) {
          threeObject.shadow.camera.aspect = value;
        }
      },
      default: PointLightDescriptor.defaultShadowCameraAspect,
    });
  }

  construct(props) {
    const {
      color,
      intensity,
      distance,
      decay,
    } = props;

    return new THREE.PointLight(color, intensity, distance, decay);
  }
}

module.exports = PointLightDescriptor;
