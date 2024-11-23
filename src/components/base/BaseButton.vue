<template>
    <button :class="buttonClasses" :type="nativeType" :disabled="disabled">
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    name: "BaseButton",
    props: {
      type: {
        type: String,
        default: "default", // 'default', 'primary', 'success', 'danger', etc.
      },
      nativeType: {
        type: String,
        default: "button", // 'button', 'submit', 'reset'
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      buttonClasses() {
        return [
          "base-button",
          `base-button--${this.type}`,
          { "is-disabled": this.disabled },
        ];
      },
    },
  };
  </script>
  
  <style scoped>
  .base-button {
    padding: 0.75em 1.25em;
    border: none;
    cursor: pointer;
    font-size: 1em;
    border-radius: 4px;
    transition: all 0.3s ease; /* Transisi smooth */
  }
  
  .base-button--default {
    background-color: #f5f5f5;
    color: #333;
  }
  
  .base-button--primary {
    background-color: #00703c;
    color: #fff;
    border: 1px solid #00703c;
  }
  
  .base-button--primary.is-disabled {
    background-color: #d1d5db; 
    color: #9ca3af;
    border-color: #d1d5db;
    cursor: not-allowed;
  }
  
  .base-button--primary.active {
    background-color: #00703c;
    color: white;
  }
  
  .is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  </style>
  