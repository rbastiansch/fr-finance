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
      v-show="data.showOptions"
      class="absolute max-h-40 bg-white overflow-auto p-1 rounded-md shadow-md"
    >
      <ul
        role="listbox"
        aria-labelledby="teste-label"
        class="divide-solid divide-y p-0"
      >
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          :value="option.value"
          role="option"
          class="cursor-pointer p-1"
          :class="{'bg-gray-50': option.text === data.input}"
          @mousedown="clickOption(option.text)"
        >
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from '@nuxtjs/composition-api'

const props = defineProps({
  options: {
    type: Array,
    default: () => ([])
  },
  value: {
    type: String,
    default: null
  }
})

const data = reactive({
  input: null,
  showOptions: false
})

const emit = defineEmits(['input', 'click:option'])

watch(() => props.value, (value) => {
  data.input = value
}, {
  immediate: true
})

watch(() => data.input, (value) => {
  emit('input', value)
})

const filteredOptions = computed(() => props.options.filter(option => {
  if (!data.input) {
    return option
  }

  const normalizedText = option.text?.toLowerCase()
  const normalizedInput = data.input?.toLowerCase()
  if (normalizedText.includes(normalizedInput)) {
    return option
  }

  return false
}))

const inputHasEqualOption = computed(() => filteredOptions.value.find(option => option.text === data.input))

const keypress = (event) => {
  if (!data.showOptions) {
    handleOptions(true)
  }

  if(event.key === 'Enter') {
    handleOptions(false)
  }
}

const handleOptions = (value) => {
  data.showOptions = value

  if(!value && inputHasEqualOption.value) {
    emit('click:option', inputHasEqualOption.value.text)
  }
}

const clickOption = (value) => {
  emit('click:option', value)
}
</script>
