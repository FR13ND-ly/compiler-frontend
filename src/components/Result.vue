<template>
    <div class="flex flex-col w-full">
        <div class="bg-teal-800 text-teal-200 p-2 px-5 text-lg">Output</div>
        <pre
            class="text-left w-full h-[70vh] overflow-y-auto flex bg-black p-4 px-6"
            :class="{
                'text-red-400': result.status == 500,
                'text-white': result.status == 200,
            }"
            >{{ result.data }}</pre
        >
    </div>
</template>

<script>
export default {
    name: "ResultSection",
    props: {
        result: Object,
    },
}
</script>
