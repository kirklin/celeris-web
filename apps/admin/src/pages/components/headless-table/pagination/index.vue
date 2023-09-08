<script setup lang="ts">
import { FlexRender, createColumnHelper, getCoreRowModel, getPaginationRowModel, useVueTable } from "@tanstack/vue-table";

import type { ChatGPTDemoTableRow } from "~/pages/components/headless-table/basic/data";

defineOptions({
  name: "HeadlessTablePagination",
});

const columnHelper = createColumnHelper<ChatGPTDemoTableRow>();
const columns = [
  columnHelper.accessor(row => row.userInput, {
    id: "userInput",
    cell: info => info.getValue(),
    header: () => " 用户输入",
    footer: props => props.column.id,
  }),
  columnHelper.accessor(row => row.expectedReply, {
    id: "expectedReply",
    cell: info => info.getValue(),
    header: () => "预期回复",
    footer: props => props.column.id,
  }),
  columnHelper.accessor(row => row.isTestPassed, {
    id: "isTestPassed",
    cell: info => info.getValue() === true ? "✅" : "❌",
    header: () => "是否通过测试",
    footer: props => props.column.id,
  }),
];
const table = useVueTable({
  get data() {
    const chatGPTDemoTestData: ChatGPTDemoTableRow[] = [];
    // 生成100次数据chatGPTDemoTestData
    for (let i = 0; i < 100; i++) {
      chatGPTDemoTestData.push({
        id: i,
        userInput: `用户输入${i}`,
        expectedReply: `预期回复${i}`,
        isTestPassed: i % 2 === 0,
      });
    }
    return chatGPTDemoTestData;
  },
  debugAll: false,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
function handlePageSizeChange(pageSize: number) {
  table.setPageSize(pageSize);
}
</script>

<template>
  <NCard title="分页表单">
    <NTable :bordered="true" :single-line="false" striped>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="(header) in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
            class="font-bold!"
            scope="col"
          >
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td
            v-for="(cell) in row.getVisibleCells()"
            :key="cell.id"
          >
            <div>
              <div>
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="table.getRowModel().rows.length === 0">
          <td
            :colspan="table.getAllColumns().length"
          >
            <NEmpty />
          </td>
        </tr>
      </tbody>
    </NTable>
    <NPagination
      :default-page="Number(0)"
      :page="table.getState().pagination.pageIndex"
      :page-count="table.getPageCount()"
      show-size-picker
      :page-sizes="[10, 20, 30, 40, 50]"
      @update:page-size="handlePageSizeChange"
    />
  </NCard>
</template>

<style scoped>

</style>
