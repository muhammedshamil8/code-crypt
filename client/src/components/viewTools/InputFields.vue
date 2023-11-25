<!-- InputField.vue -->
<template>
  <div class="container2">
     <label :for="name" class="label-container">{{ label }}</label>
     <br/>
     <input
     class="input"
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
  
<style scoped>
.label-container {
   display: flex;
   align-items: center;
   justify-content: start;
   padding-top: 5px;
  }

.container2{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.input {
  width: 453px;
  height: 40px;
  border-radius: 10px;
  border:none;
  background-color: #d9d9d9;
  font-size: 16px;
}
</style>