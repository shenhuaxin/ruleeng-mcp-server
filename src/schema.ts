import { z } from "zod";


export const AssignValueSchema = z.object({
  // 赋值变量-左值：必填字符串
  assignValue: z.string().describe("赋值变量-左值"),
  // 赋值结果-右值：必填字符串
  sourceValue: z.string().describe("赋值结果-右值"),
  // 赋值结果类型：只能是 1（固定值）或 2（变量）的整数
  valueType: z.number()
    .int('valueType 必须是整数') // 确保是整数，对应 Java 的 Integer
    .describe("赋值类型 1: 固定值 2：变量")
    .refine(val => [1, 2].includes(val), {
      message: 'valueType 只能是 1（固定值）或 2（变量）'
    })
});

export const AssignConfSchema = z.object({
  assigns: z.array(AssignValueSchema).describe("配置信息").default([]),
  group: z.object().required().default({})
}).describe("配置信息");

export const LogicGroup = z.object({
  conjunction: z.enum(["and", "or"]).describe("连词").default("and"),
  sourceValue: z.string().describe("原值"),
  op: z.string().describe("比较符号"),
  valueType: z.int().describe("1:固定值， 2:变量"),
  compareValue: z.string().describe("对比值"),
  get children() {
    return z.array(LogicGroup).optional()
  }
});


export const SwitchCase = z.object({
  group: z.object(LogicGroup).describe("条件逻辑"),
  jumpTo: z.string().describe("该条件成立对应的节点ID"),
  remark: z.string().describe("条件描述"),
  isDefault: z.boolean().describe("是否为默认条件")
});

// export const SwitchToConfig =
//   z.object({
//     conf: z.array(SwitchCase)
//   })