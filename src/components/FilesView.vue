<template>
    <section
        class="flex gap-1 pt-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <article
            class="cursor-pointer w-fit py-3 px-5 flex-shrink-0"
            v-for="(file, index) in files"
            :key="index"
            @click="changeFile(index)"
            :class="{
                'bg-gray-700': index == selectedFile,
                'bg-gray-800': index != selectedFile,
            }"
            @mousedown="handleMiddleClick(index, $event)">
            {{ file.language }}
            <span
                @click="closeFile(index, $event)"
                class="ml-4 text-red-500 hover:text-red-700"
                v-if="files.length > 1"
                >x</span
            >
        </article>
        <article
            @click="addFile()"
            class="cursor-pointer bg-gray-800 w-fit py-3 px-5 z-10">
            +
        </article>
    </section>
</template>
<script>
export default {
    name: "FilesView",
    props: {
        files: Object,
        selectedFile: Number,
    },
    data() {
        return { showModal: false }
    },
    methods: {
        addFile() {
            this.showModal = true
            let newFile = {
                code: 'console.log("Hello World")',
                language: "javascript",
                result: {
                    data: "Result will be shown here",
                },
            }
            this.$emit("update:files", [...this.files, newFile])
            this.$emit("update:selectedFile", this.files.length)
        },
        changeFile(i) {
            this.$emit("update:selectedFile", i)
        },
        closeFile(i, e) {
            e.stopPropagation()
            let files = [...this.files]
            files.splice(i, 1)
            if (
                (i < this.selectedFile && this.selectedFile) ||
                (i == this.selectedFile && this.files.length == i + 1)
            ) {
                this.$emit("update:selectedFile", this.selectedFile - 1)
            }
            this.$emit("update:files", files)
        },
        handleMiddleClick(index, event) {
            if (event.button === 1) {
                this.closeFile(index, event)
            }
        },
    },
}
</script>
