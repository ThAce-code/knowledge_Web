# 下载资源目录

这个目录用于存放网站的下载资源文件。

## 目录结构

```
downloads/
├── code-samples/       # 代码示例和项目模板
├── software/          # 推荐软件和工具
├── documentation/     # 技术文档和手册
└── other/            # 其他资源
```

## 使用说明

1. 将 .zip 文件放入对应的分类文件夹
2. 在 `app/lib/downloads.ts` 的 `DOWNLOAD_RESOURCES` 数组中添加资源元数据
3. 确保 `filePath` 与实际文件路径匹配

## 文件命名规范

- 使用小写字母和连字符（kebab-case）
- 示例：`stm32-template.zip`, `keil-setup-guide.zip`
- 包含版本号（如需要）：`tool-v1.2.zip`

## 示例

假设你有一个文件 `stm32-template.zip` 要上传：

1. 将文件放到 `code-samples/` 文件夹
2. 在 `app/lib/downloads.ts` 中添加：

```typescript
{
  id: 'stm32-template',
  name: 'STM32 项目模板',
  description: 'STM32CubeMX + HAL库项目模板',
  category: 'code-samples',
  filePath: 'code-samples/stm32-template.zip',  // 相对于 downloads/ 的路径
  fileSize: '3.2 MB',
  version: 'v1.0',
  tags: ['STM32', 'HAL'],
  lastUpdated: '2026-01-04',
}
```

3. 用户访问 `/downloads` 页面即可看到并下载

## 注意事项

- 文件大小建议控制在 50MB 以内
- 大文件建议使用 GitHub Releases 或云存储托管
- 文件路径大小写敏感
- 更新资源时记得更新 `lastUpdated` 字段
