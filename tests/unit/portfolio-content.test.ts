import { describe, expect, it } from 'vitest';

import {
  capabilities,
  education,
  experience,
  profile,
  projects,
  workflow,
} from '../../src/data/portfolio';

describe('作品集内容契约', () => {
  it('包含四个已确认项目与两段工作经历', () => {
    expect(projects.map((project) => project.name)).toEqual([
      '医疗智能导诊 Agent',
      '神州打卡绘微信小程序',
      '微信 AI 聊天助手',
      '文博元宇宙数字人交互系统',
    ]);
    expect(experience).toHaveLength(2);
  });

  it('每个项目都形成业务闭环', () => {
    for (const project of projects) {
      expect(project.summary.trim()).not.toBe('');
      expect(project.problem.trim()).not.toBe('');
      expect(project.work.trim()).not.toBe('');
      expect(project.solution.trim()).not.toBe('');
      expect(project.outcome.trim()).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(2);
    }
  });

  it('允许未公开项目不提供链接', () => {
    const medicalAgent = projects.find((project) => project.name === '医疗智能导诊 Agent');
    const shenzhouCheckin = projects.find((project) => project.name === '神州打卡绘微信小程序');
    expect(medicalAgent).toBeDefined();
    expect(medicalAgent?.href).toBeUndefined();
    expect(shenzhouCheckin?.href).toBeUndefined();
  });

  it('只公开已确认的安全联系方式', () => {
    expect(profile.github).toBe('https://github.com/2718704495-eng');
    expect(profile.email).toBe('2718704495@qq.com');
    expect(JSON.stringify(profile)).not.toMatch(/157\d{8}|住址|address/i);
  });

  it('能力、工作流与教育信息完整且不含模板占位内容', () => {
    expect(capabilities).toHaveLength(4);
    expect(workflow).toHaveLength(6);
    expect(education.school).toBe('浙江工业大学之江学院');
    expect(education.award).toContain('省级三等奖');

    const content = JSON.stringify({ profile, capabilities, experience, projects, workflow, education });
    expect(content).not.toMatch(/Project One|Northwind Studio|Example University|example\.com|Your Name/i);
  });
});
