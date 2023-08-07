<script setup lang="ts" generic="T">
import type { Table } from "@tanstack/vue-table";
import { FlexRender } from "@tanstack/vue-table";

defineProps<{
  table: Table<T>;
}>();
</script>

<template>
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
</template>
