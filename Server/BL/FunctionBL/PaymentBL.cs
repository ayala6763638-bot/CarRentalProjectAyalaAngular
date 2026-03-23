using BL.ClassesDTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.FunctionBL
{
    public class PaymentBL
    {
        DBConnection conn = new DBConnection();

        public List<PaymentDTO> GetAllPayment()
        {
            DBConnection dbCon = new DBConnection(); ;
            List<Payments> listOfPayments = dbCon.GetDbSet<Payments>().ToList();
            return Convert(listOfPayments);
        }
        //פונקציית הוספה:
        public string InsertPayment(PaymentDTO payment)
        {
            DBConnection dbCon = new DBConnection();
            try
            {
                var p = Convert(payment);
                // הפונקציה הזו מעדכנת את ה-p.code בערך החדש מה-DB
                dbCon.Execute<Payments>(p, DBConnection.ExecuteActions.Insert);

                return p.code.ToString(); // מחזירים את ה-ID האמיתי (למשל 105)
            }
            catch (Exception ex)
            {
                // זה יציג לך בחלון ה-Output את השגיאה המפורטת מה-SQL (למשל: חסר שדה, או הפרת מפתח זר)
                System.Diagnostics.Debug.WriteLine("Error Details: " + ex.InnerException?.InnerException?.Message);
                return "error";
            }
        }
        //פונקציית עדכון:
        public int UpDatePayment(PaymentDTO payment)
        {
            DBConnection dbCon = new DBConnection();
            try
            {
                dbCon.Execute<Payments>(Convert(payment), DBConnection.ExecuteActions.Update);
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        //פונקציית מחיקה:
        public int DeletePayment(PaymentDTO payments)
        {
            DBConnection dbCon = new DBConnection();
            try
            {
                dbCon.Execute<Payments>(Convert(payments), DBConnection.ExecuteActions.Delete);
                return 1;
            }
            catch
            {
                return 0;
            }
        }


        public PaymentDTO Convert(Payments c2)
        {
            PaymentDTO c1 = new PaymentDTO();
           c1.code = c2.code;
            c1.cvc = c2.cvc;
            c1.creaditCard = c2.creaditCard;
            c1.validity = c2.validity;
            
            return c1;
        }
        public Payments Convert(PaymentDTO c2)
        {
            Payments c1 = new Payments();
            c1.code = c2.code;
            c1.cvc = c2.cvc;
            c1.creaditCard = c2.creaditCard;
            c1.validity = c2.validity;
            return c1;
        }
        public List<PaymentDTO> Convert(List<Payments> c1)
        {
            List<PaymentDTO> list = new List<PaymentDTO>();
            foreach (Payments c in c1)
            {
                list.Add(Convert(c));
            }
            return list;
        }
        public List<Payments> Convert(List<PaymentDTO> cs)
        {
            List<Payments> list = new List<Payments>();
            foreach (PaymentDTO c in cs)
            {
                list.Add(Convert(c));
            }
            return list;
        }
    }
}
