/**
 * 雪花算法（Snowflake）是一种生成分布式唯一 ID 的算法。
 * 它的原理是将一个 64 位的二进制数分成多个部分，每个部分表示不同的信息，然后将这些信息组合起来生成一个唯一的 ID。
 *
 * 雪花算法的 ID 结构如下图所示：
 *    0|----------------41----------------|------10------|------12------|
 *    符号位（未使用）     时间戳（毫秒）        工作节点 ID      序列号
 *
 * 从左到右，第 1 位是未使用的，接下来的 41 位是时间戳，其中最高位是符号位，因此可表示的时间范围是 2^41 - 1 毫秒，大约是 69 年。
 * 接下来的 10 位是工作节点 ID，最后的 12 位是序列号，可表示同一毫秒内生成的最大 ID 数量为 2^12 = 4096。
 *
 * 作为一种分布式唯一 ID 的生成算法，雪花算法可以在分布式系统中使用，避免因为不同节点生成相同的 ID 而导致数据冲突的问题。
 * 在实际应用中，雪花算法常用于唯一 ID 的生成
 *
 */
export class Snowflake {
  private readonly epoch = BigInt(978278400000); // 自定义开始时间戳，此处为 2001-01-01 00:00:00
  // workerId、datacenterId 和 sequence 的位数
  private readonly workerIdBits = 5;
  private readonly datacenterIdBits = 5;
  private readonly sequenceBits = 12;

  private readonly maxWorkerId = -1n ^ (-1n << BigInt(this.workerIdBits));
  private readonly maxDatacenterId = -1n ^ (-1n << BigInt(this.datacenterIdBits));
  private readonly maxSequence = -1n ^ (-1n << BigInt(this.sequenceBits));

  private readonly workerIdShift = this.sequenceBits;
  private readonly datacenterIdShift = this.sequenceBits + this.workerIdBits;
  private readonly timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits;

  private sequence = 0n;
  private lastTimestamp = -1n;

  constructor(private readonly workerId: number, private readonly datacenterId: number) {
    if (workerId > Number(this.maxWorkerId) || workerId < 0) {
      throw new Error(`worker id can't be greater than ${this.maxWorkerId} or less than 0`);
    }

    if (datacenterId > Number(this.maxDatacenterId) || datacenterId < 0) {
      throw new Error(`datacenter id can't be greater than ${this.maxDatacenterId} or less than 0`);
    }
  }

  private now(): bigint {
    return BigInt(new Date().getTime());
  }

  private tilNextMillis(lastTimestamp: bigint): bigint {
    let timestamp = this.now();
    while (timestamp <= lastTimestamp) {
      timestamp = this.now();
    }
    return timestamp;
  }

  // 生成下一个 ID
  nextId(): string {
    let timestamp = this.now();

    // 如果时间回调了，则抛出异常
    if (timestamp < this.lastTimestamp) {
      throw new Error(`clock moved backwards. refusing to generate id for ${this.lastTimestamp - timestamp} milliseconds`);
    }

    // 如果时间戳相同，则序列号加 1
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & this.maxSequence;
      if (this.sequence === 0n) {
        timestamp = this.tilNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    const id
      = ((BigInt(timestamp) - this.epoch) << BigInt(this.timestampLeftShift))
      | (BigInt(this.datacenterId) << BigInt(this.datacenterIdShift))
      | (BigInt(this.workerId) << BigInt(this.workerIdShift))
      | this.sequence;

    return id.toString();
  }
}
