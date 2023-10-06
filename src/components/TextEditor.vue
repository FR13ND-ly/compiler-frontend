<template>
    <div>
        Language:
        <select
            class="mb-4 text-teal-200 bg-teal-900 rounded-none"
            @change="changeLang($event.target.value)">
            <option
                :value="lang.value"
                :selected="lang.value == language"
                v-for="lang in languages"
                :key="lang.value">
                {{ lang.showValue }}
            </option>
        </select>
    </div>
    <div ref="editor" class="h-[70vh] w-[50vw] mb-4"></div>
</template>

<script>
import * as monaco from "monaco-editor"

export default {
    name: "MonacoEditor",
    props: {
        code: String,
        language: String,
    },
    data: () => {
        return {
            languages: [
                {
                    value: "javascript",
                    showValue: "Node JS",
                },
                {
                    value: "python",
                    showValue: "Python",
                },
                {
                    value: "cpp",
                    showValue: "C++",
                },
                {
                    value: "java",
                    showValue: "Java",
                },
                // {
                //     value: "c",
                //     showValue: "C",
                // },
                // {
                //     value: "rust",
                //     showValue: "Rust",
                // },
                // {
                //     value: "c#",
                //     showValue: "C#",
                // },
                // {
                //     value: "haskell",
                //     showValue: "Haskell",
                // },
            ],
        }
    },
    methods: {
        changeLang(lang) {
            monaco.editor.setModelLanguage(monaco.editor.getModels()[0], lang)
            this.$emit("update:language", lang)
        },
    },
    watch: {
        code(val) {
            let editor = monaco.editor.getModels()[0]
            if (editor.getValue() != val) {
                monaco.editor.getModels()[0].setValue(val)
            }
        },
    },
    mounted() {
        monaco.editor.create(this.$refs.editor, {
            value: this.code,
            language: this.language,
        })
        monaco.editor.setTheme("vs-dark")
        monaco.editor
            .getModels()[0]
            .onDidChangeContent(() =>
                this.$emit(
                    "update:code",
                    monaco.editor.getModels()[0].getValue()
                )
            )
    },
}
</script>
