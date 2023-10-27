<script setup>
defineProps(['modelValue', 'id', 'label', 'required'])
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="text-gray-400" :for="id"
    >{{ label }}
    <span class="text-gray-400" v-if="required" aria-label="required">*</span>
  </label>
  <textarea
    class="px-3 py-2 bg-gray-800 text-gray-400 rounded-xl focus:border-white"
    :id="id"
    :name="id"
    :required="required"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  </textarea>
</template>
