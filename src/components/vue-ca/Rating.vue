<template>
	<div id='#/properties/rating' className='rating'>
      <InputLabel shrink>Rating</InputLabel>
      <div>
        <span>
		</span>
      </div>
    </div>

</template>

<script>
import Vue from 'vue';

export default ({
	data() {
	},
	props: {
		id: { required: true, type: String },
		value: { required: false, type: number }
	}
});

/*interface RatingProps {
  id?: string;
  value: number;
  updateValue: (newValue: number) => void;
}*/

</script>