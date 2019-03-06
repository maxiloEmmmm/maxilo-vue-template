import _Compact from './components/Compact.vue'
export const Compact = _Compact
import Grayscale from './components/Grayscale.vue'
import Material from './components/Material.vue'
import Slider from './components/Slider.vue'
import Swatches from './components/Swatches.vue'
import Photoshop from './components/Photoshop.vue'
import _Sketch from './components/Sketch.vue'
export const Sketch = _Sketch
import Chrome from './components/Chrome.vue'
import Alpha from './components/common/Alpha.vue'
import Checkboard from './components/common/Checkboard.vue'
import EditableInput from './components/common/EditableInput.vue'
import Hue from './components/common/Hue.vue'
import Saturation from './components/common/Saturation.vue'
import ColorMixin from './mixin/color.js'
const VueColor = {
  version: '2.7.0',
  Compact,
  Grayscale,
  Material,
  Slider,
  Swatches,
  Photoshop,
  Sketch,
  Chrome,
  Alpha,
  Checkboard,
  EditableInput,
  Hue,
  Saturation,
  ColorMixin
}

export default VueColor
