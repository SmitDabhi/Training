namespace Helperland.Models.viewModels
{
    public class CompleteBookVM
    {
        public string StartDateTIme { get; set; }
        
        public float Duration { get; set; }

        public string Comment { get; set; }

        public bool HasPet{ get; set; }
        public int AddressId{ get; set; }

        public string PostalCode { get; set; }

        public float ExtraHours { get; set; }

        public bool Cabinet { get; set; }

        public bool Fridge { get; set; }

        public bool Oven { get; set; }

        public bool Wash { get; set; }

        public bool Windows { get; set; }
    }
}
