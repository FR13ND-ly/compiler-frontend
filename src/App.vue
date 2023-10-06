<template>
    <MainHeader></MainHeader>
    <main class="px-8 text-teal-200">
        <FilesView
            v-model:files="files"
            v-model:selectedFile="selectedFile"></FilesView>
        <section class="flex justify-between pt-4 gap-4">
            <div>
                <TextEditor
                    v-model:code="file.code"
                    v-model:language="file.language"></TextEditor>
                <button
                    @click="compile"
                    class="bg-teal-800 p-2 hover:bg-teal-600">
                    Compile
                </button>
                <button
                    @click="downloadCode"
                    class="bg-teal-800 p-2 hover:bg-teal-600 float-right">
                    Download Code
                </button>
            </div>
            <ResultSection :result="file.result"></ResultSection>
        </section>
    </main>
</template>

<script>
import MainHeader from "./components/Header.vue"
import TextEditor from "./components/TextEditor.vue"
import ResultSection from "./components/Result.vue"
import FilesView from "./components/FilesView.vue"
import axios from "axios"

export default {
    components: {
        MainHeader,
        TextEditor,
        ResultSection,
        FilesView,
    },
    data: () => {
        return {
            selectedFile: parseInt(localStorage.getItem("index")),
            files: JSON.parse(localStorage.getItem("files")),
            onLine: navigator.onLine,
        }
    },
    computed: {
        file() {
            if (!this.files) {
                this.resetFiles()
            }
            localStorage.setItem("files", JSON.stringify(this.files))
            return this.files[this.selectedFile]
        },
    },
    watch: {
        selectedFile(val) {
            localStorage.setItem("index", val)
        },
    },
    methods: {
        compile() {
            let data = {
                language: this.file.language,
                code: this.file.code,
            }
            let dotsCount = 0
            const interval = setInterval(() => {
                const dots = ".".repeat(dotsCount)
                this.files[this.selectedFile].result = {
                    data: `Waiting${dots}`,
                }
                dotsCount = (dotsCount + 1) % 4
            }, 150)
            axios
                .post("https://compiler-g0yo.onrender.com/compile", data)
                .then((res) => {
                    clearInterval(interval)
                    this.files[this.selectedFile].result = res
                })
                .catch((err) => {
                    clearInterval(interval)
                    this.files[this.selectedFile].result = err.response
                })
        },
        updateOnlineStatus(e) {
            const { type } = e
            this.onLine = type === "online"
        },
        resetFiles() {
            this.files = [
                {
                    code: 'console.log("Hello World")',
                    language: "javascript",
                    result: {
                        data: "Result will be shown here",
                    },
                },
            ]
            this.selectedFile = 0
        },
        downloadCode() {
            const blob = new Blob([this.file.code], { type: "text/plain" })

            const url = window.URL.createObjectURL(blob)

            const link = document.createElement("a")
            link.href = url
            link.download = "code."
            if (this.file.language == "javascript") {
                link.download += "js"
            } else if (this.file.language == "python") {
                link.download += "py"
            } else if (this.file.language == "cpp") {
                link.download += "cpp"
            } else if (this.file.language == "java") {
                link.download += "java"
            }
            link.click()

            window.URL.revokeObjectURL(url)
        },
    },

    mounted() {
        window.addEventListener("online", this.updateOnlineStatus)
        window.addEventListener("offline", this.updateOnlineStatus)
    },
}
</script>
