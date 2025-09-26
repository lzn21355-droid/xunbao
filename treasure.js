// 原始模拟宝藏地图API（保留）
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1500);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }
}

// 新增的有趣情节
class Adventure {
  // 拜访历史学家，获取更精确的神庙坐标
  static consultHistorian() {
    return new Promise((resolve) => {
      const wait = 800 + Math.random() * 800;
      setTimeout(() => {
        resolve("历史学家提供了坐标与避开陷阱的小贴士。");
      }, wait);
    });
  }

  // 解谜机关门
  static solveRiddleDoor() {
    return new Promise((resolve, reject) => {
      const time = 1200;
      setTimeout(() => {
        const ok = Math.random() > 0.2; // 80% 成功
        if (!ok) return reject("机关门谜题太复杂，解答失败。");
        resolve("机关门发出咔哒声，缓缓开启。");
      }, time);
    });
  }

  // 潜行绕过守卫
  static stealthPastGuards(hasTip = true) {
    return new Promise((resolve, reject) => {
      const time = 1000;
      setTimeout(() => {
        // 有贴士成功率更高
        const base = hasTip ? 0.8 : 0.55;
        const ok = Math.random() < base;
        if (!ok) return reject("被守卫发现了！只好暂避锋芒。");
        resolve("你趁火把转角时悄然通过。");
      }, time);
    });
  }

  // 解除箱子陷阱
  static disarmTrap() {
    return new Promise((resolve, reject) => {
      const time = 1500;
      setTimeout(() => {
        const ok = Math.random() > 0.15; // 85% 成功
        if (!ok) return reject("触发了机关，箱子被再次上锁！");
        resolve("成功解除箱子上的毒针陷阱。");
      }, time);
    });
  }

  // 鉴定宝物真伪
  static appraiseTreasure() {
    return new Promise((resolve) => {
      const time = 900;
      setTimeout(() => {
        const real = Math.random() > 0.3; // 70% 真宝
        resolve(real ? "鉴定结果：真品！" : "鉴定结果：赝品，不过也很精美。");
      }, time);
    });
  }

  // 胜利庆祝
  static celebrate(result) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`篝火晚会庆祝：${result}`), 600);
    });
  }
}

// 使用 async/await 的完整寻宝流程（带重试与分支）
async function findTreasureAsync() {
  try {
    console.log("出发！");
    const clue = await TreasureMap.getInitialClue();
    console.log(clue);

    const historianTip = await Adventure.consultHistorian();
    console.log(historianTip);

    const location = await TreasureMap.decodeAncientScript(clue);
    console.log(location);

    // 机关门（支持一次失败后重试）
    try {
      console.log("尝试解开机关门的谜题...");
      console.log(await Adventure.solveRiddleDoor());
    } catch (e) {
      console.warn(e, "准备使用历史学家的提示重试...");
      console.log(await Adventure.solveRiddleDoor());
    }

    // 潜行绕过守卫（若失败，等待再尝试一次）
    let passed = false;
    for (let i = 0; i < 2 && !passed; i++) {
      try {
        console.log(await Adventure.stealthPastGuards(true));
        passed = true;
      } catch (e) {
        console.warn(e, "躲到石像后观察一会儿，再试一次...");
        await new Promise(r => setTimeout(r, 800));
      }
    }
    if (!passed) throw new Error("多次尝试仍未绕过守卫，先撤退。");

    const box = await TreasureMap.searchTemple(location);
    console.log(box);

    console.log(await Adventure.disarmTrap());

    const treasure = await TreasureMap.openTreasureBox();
    console.log(treasure);

    const appraisal = await Adventure.appraiseTreasure();
    console.log(appraisal);

    const finale = await Adventure.celebrate(appraisal.includes("真品") ? "举杯同庆！" : "虽是赝品，也不虚此行。");
    console.log(finale);
  } catch (error) {
    console.error("任务失败:", error);
  }
}

// 运行
findTreasureAsync();