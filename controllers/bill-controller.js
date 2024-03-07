const db = require('../models/db');

exports.getBills = async (req, res, next) => {
  try {
    const bills = await db.bill.findMany();
    res.json(bills);
  } catch (err) {
    next(err);
  }
};

exports.getBillById = async (req, res, next) => {
  try {
    const { billId } = req.params;
    const bill = await db.bill.findUnique({
      where: { id: +billId },
      include: {
        fish: true,
        member: true,
      },
    });
    if (!bill) {
      return res.status(404).json({ msg: 'ไม่พบข้อมูลใบเสร็จรับเงิน' });
    }
    res.json(bill);
  } catch (err) {
    next(err);
  }
};

exports.returnBill = async (req, res, next) => {
    try {
      const { billId } = req.params;
  
      const updatedBill = await db.bill.update({
        where: { id: +billId },
        data: {
          shotDate: new Date().toISOString(),
          status: 'จ่ายแล้ว',
        },
      });
  
      res.json({ msg: 'ชำระเงินบิลสำเร็จ', result: updatedBill });
    } catch (err) {
      next(err);
    }
  };

exports.createBill = async (req, res, next) => {
  try {
    const { fishId, memberId, dayDate, shotDate, money, status } = req.body;

    const newBill = await db.bill.create({
      data: {
        fish: { connect: { id: +fishId } },
        member: { connect: { id: +memberId } },
        dayDate: dayDate ? new Date(dayDate).toISOString() : null,
        shotDate: shotDate ? new Date(shotDate).toISOString() : null,
        money,
        status,
      },
    });

    res.json({ msg: 'สร้างใบเสร็จรับเงินเรียบร้อยแล้ว', result: newBill });
  } catch (err) {
    next(err);
  }
};

exports.updateBill = async (req, res, next) => {
  try {
    const { billId } = req.params;
    const { fishId, memberId, dayDate, shotDate, money, status } = req.body;

    // ตรวจสอบว่า fishId และ memberId ไม่ใช่ NaN ก่อนที่จะเรียกใช้ db.bill.update
    if (isNaN(fishId) || isNaN(memberId)) {
      return res.status(400).json({ msg: 'Invalid fishId or memberId' });
    }

    const updatedBill = await db.bill.update({
      where: { id: +billId },
      data: {
        fish: { connect: { id: +fishId } },
        member: { connect: { id: +memberId } },
        dayDate: dayDate ? new Date(dayDate).toISOString() : null,
        shotDate: shotDate ? new Date(shotDate).toISOString() : null,
        money,
        status,
      },
    });

    res.json({ msg: 'อัพเดตข้อมูลใบเสร็จรับเงินสำเร็จ', result: updatedBill });
  } catch (err) {
    next(err);
  }
};

exports.returnBill = async (req, res, next) => {
  try {
    const { billId } = req.params;

    const updatedBill = await db.bill.update({
      where: { id: +billId },
      data: {
        shotDate: new Date().toISOString(), // เพิ่มบันทึกวันที่สูญหายในฟิลด์ shotDate
        status: 'จ่ายแล้ว', // อัพเดตสถานะเป็น 'จ่ายแล้ว'
      },
    });

    res.json({ msg: 'ชำระเงินบิลสำเร็จ', result: updatedBill });
  } catch (err) {
    next(err);
  }
};

exports.updateBillStatus = async (req, res, next) => {
  try {
    const { billId } = req.params;
    const { status } = req.body;

    const updatedBill = await db.bill.update({
      where: { id: +billId },
      data: {
        status, // อัพเดตสถานะตามที่รับมาจาก request body
      },
    });

    res.json({ msg: 'อัพเดตสถานะบิลสำเร็จ', result: updatedBill });
  } catch (err) {
    next(err);
  }
};

exports.deleteBill = async (req, res, next) => {
  try {
    const { billId } = req.params;

    await db.bill.delete({
      where: { id: +billId },
    });

    res.json({ msg: 'ลบข้อมูลใบเสร็จรับเงินสำเร็จ' });
  } catch (err) {
    next(err);
  }
};
