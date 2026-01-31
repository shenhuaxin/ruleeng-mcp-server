import { z } from "zod";


export const AssignValueSchema = z.object({
  // 赋值变量-左值：必填字符串
  assignValue: z.string().describe("赋值变量-左值"),
  // 赋值结果-右值：必填字符串
  sourceValue: z.string().describe("赋值结果-右值"),
  // 赋值结果类型：只能是 1（固定值）或 2（变量）的整数
  valueType: z.union([z.literal(1), z.literal(2)]) // 确保是整数，对应 Java 的 Integer
    .describe("赋值类型 1: 固定值 2：变量")
});

export const AssignConfSchema = z.object({
  assigns: z.array(AssignValueSchema).describe("配置信息").default([]),
  group: z.object().required().default({})
}).describe("配置信息");

export const AssignConfig = z.object({
  conf: z.array(AssignConfSchema).describe("节点配置信息").default([]),
})

export const LogicGroup = z.object({
  conjunction: z.enum(["and", "or"]).describe("连词").optional().default("and"),
  sourceValue: z.string().describe("原值").optional(),
  op: z.string().describe("比较符号").optional(),
  valueType: z.number().int().describe("1:固定值， 2:变量").optional(),
  compareValue: z.string().describe("对比值").optional(),
  get children() {
    return z.array(LogicGroup).optional().default([])
  }
})


export const SwitchCase = z.object({
  group: LogicGroup.describe("条件逻辑"),
  edgeId: z.string().describe("连接的边的ID"),
  jumpTo: z.string().describe("该条件成立对应的节点ID"),
  remark: z.string().describe("条件描述"),
  isDefault: z.boolean().describe("是否为默认条件")
});

export const SwitchConf = z.object({
  conf: z.array(SwitchCase).describe("节点配置信息").default([]),
})


export const CalculateExpression = z.object({
  target: z.string().describe("目标值"),
  expression: z.string().describe("表达式")
})

export const CalculateConfig = z.object({
  conf: CalculateExpression.describe("计算节点配置信息")
})

var data = JSON.stringify(AssignConfig.toJSONSchema());
console.log(data)




// export const SwitchToConfig =
//   z.object({
//     conf: z.array(SwitchCase)
//   })
