<template>
  <div class="inline-block">
    <input
      v-model="input"
      name="common-combobox"
      placeholder="Select or input"
      role="combobox"
      type="text"
      autocomplete="off"
      class="px-2 py-1 rounded w-40 border-slate-100 border"
      @focus="handleOptions(true)"
      @blur="handleOptions(false)"
      @keypress="keypress"
    >
    <div
      v-show="showOptions"
      class="absolute max-h-40 bg-white overflow-auto p-1 rounded-md shadow-md"
    >
      <ul role="listbox" aria-labelledby="teste-label" class="divide-solid divide-y p-0">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          role="option"
          class="cursor-pointer p-1"
          :class="{ 'bg-gray-50': option.text === input }"
          @mousedown="clickOption(option.text)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Option {
  text: string
  value: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    options?: Option[]
  }>(),
  { options: () => [] }
)

const canShowOptions = ref(false)
const input = ref('')

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select-option': [value: string]
}>()

watch(
  () => props.modelValue,
  (value) => {
    input.value = value
  },
  { immediate: true }
)

watch(input, (value) => emit('update:modelValue', value))

const filteredOptions = computed(() =>
  props.options.filter((option) => {
    if (!input.value) return true
    return option.text.toLowerCase().includes(input.value.toLowerCase())
  })
)

const inputHasEqualOption = computed(() =>
  filteredOptions.value.find((option) => option.text === input.value)
)

const showOptions = computed(() => canShowOptions.value && filteredOptions.value.length > 0)

const keypress = (event: KeyboardEvent) => {
  if (!canShowOptions.value) handleOptions(true)
  if (event.key === 'Enter') handleOptions(false)
}

const handleOptions = (value: boolean) => {
  canShowOptions.value = value
  if (!value && inputHasEqualOption.value) clickOption(inputHasEqualOption.value.text)
}

const clickOption = (value: string) => {
  input.value = value
  emit('select-option', value)
}
</script>
