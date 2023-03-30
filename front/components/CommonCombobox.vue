<template>
  <div class="inline-block">
    <input
      v-model="data.input"
      name="common-combobox"
      placeholder="Select or input"
      role="combobox"
      type="text"
      autocomplete="off"
      class="px-2 py-1 rounded w-40 border-slate-100 border"
      @focus="handleOptions(true)"
      @blur="handleOptions(false)"
      @keypress="keypress"
    />
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
          :class="{ 'bg-gray-50': option.text === data.input }"
          @mousedown="clickOption(option.text)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  }
})

const data = reactive({
  input: null,
  showOptions: false
})

const emit = defineEmits(['update:modelValue', 'select-option'])

watch(
  () => props.modelValue,
  (value) => {
    data.input = value
  },
  {
    immediate: true
  }
)

watch(
  () => data.input,
  (value) => {
    emit('update:modelValue', value)
  }
)

const filteredOptions = computed(() =>
  props.options.filter((option) => {
    if (!data.input) {
      return option
    }

    const normalizedText = option.text?.toLowerCase()
    const normalizedInput = data.input?.toLowerCase()
    if (normalizedText.includes(normalizedInput)) {
      return option
    }

    return false
  })
)

const inputHasEqualOption = computed(() =>
  filteredOptions.value.find((option) => option.text === data.input)
)

const showOptions = computed(() => {
  return data.showOptions && filteredOptions.value.length
})

const keypress = (event) => {
  if (!data.showOptions) {
    handleOptions(true)
  }

  if (event.key === 'Enter') {
    handleOptions(false)
  }
}

const handleOptions = (value) => {
  data.showOptions = value

  if (!value && inputHasEqualOption.value) {
    clickOption(inputHasEqualOption.value.text)
  }
}

const clickOption = (value) => {
  data.input = value
  emit('select-option', value)
}
</script>
