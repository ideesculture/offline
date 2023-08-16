<template>
	<span>*****</span>
</template>

<script>
import { defineComponent, ref, toHandlers } from 'vue'
import { useJsonFormsControl, rendererProps} from '@jsonforms/vue';
import { useVanillaControl } from '@jsonforms/vue-vanilla';	
import { default as ControlWrapper } from '@jsonforms/vue-vanilla/src/controls/ControlWrapper.vue';


const RatingControl = defineComponent({
  name: 'RatingControl',
	data() {
	},
	components: {
    ControlWrapper,
  },
  props: {
	...rendererProps()
  },
  setup(props) {
	return useVanillaControl(
	  useJsonFormsControl(props),
	  (target) => target.value || undefined
	);
  }
});

export default useJsonFormsControl(RatingControl);

/*
 Original TS :
 
 import { withJsonFormsControlProps } from '@jsonforms/react';
import { Rating } from './Rating';

interface RatingControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
}

const RatingControl = ({ data, handleChange, path }: RatingControlProps) => (
  <Rating
    value={data}
    updateValue={(newValue: number) => handleChange(path, newValue)}
  />
);

export default withJsonFormsControlProps(RatingControl);
*/
</script>

