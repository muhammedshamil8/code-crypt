<!-- InputField.vue -->
<template>
    <div>
      <label :for="name">{{ label }}</label>
      <input
        :type="type"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        v-model="inputValue"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      name: String,
      type: {
        type: String,
        default: 'text', // default to text input type
      },
      placeholder: {
        type: String,
        default: '',
      },
      value: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        inputValue: this.value,
      };
    },
    watch: {
      inputValue(newValue) {
        this.$emit('input', newValue); // Emit input event to pass back the value
      },
    },
  };
  </script>
  