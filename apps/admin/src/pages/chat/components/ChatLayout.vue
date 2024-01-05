<script setup lang="ts">
import ChatHistorySidebar from "./ChatHistorySidebar/index.vue";
import ChatPanel from "./ChatPanel/index.vue";
import RoleManagementSidebar from "./RoleManagementSidebar/index.vue";
</script>

<template>
  <!-- 采用了分栏布局，包括一个左侧边栏和一个右侧边栏，以及一个中央面板。
左侧边栏是用于管理系统角色的区域，允许用户创建、编辑和删除系统角色。
右侧边栏显示了每个角色的聊天记录，并且可以根据用户选择的角色动态加载相应的聊天记录。
中央面板则用于展示选定角色的实时对话界面，可能包含一个消息输入框以及用于加载历史对话记录的功能。 -->
  <div class="chat-layout rounded-2xl w-full h-full min-h-full ">
    <NLayout has-sider sider-placement="left" class="h-full">
      <NLayoutSider
        collapse-mode="width"
        :collapsed-width="240"
        :width="360"
        :native-scrollbar="true"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <ChatHistorySidebar />
      </NLayoutSider>
      <NLayoutContent>
        <NLayout has-sider sider-placement="right" class="h-full">
          <NLayoutContent content-style="padding: 24px;">
            <ChatPanel />
          </NLayoutContent>
          <NLayoutSider
            collapse-mode="width"
            :collapsed-width="240"
            :width="360"
            :native-scrollbar="true"
            show-trigger="arrow-circle"
            content-style="padding: 24px;"
            bordered
          >
            <RoleManagementSidebar />
          </NLayoutSider>
        </NLayout>
      </NLayoutContent>
    </NLayout>
  </div>
</template>

<style scoped>

</style>
