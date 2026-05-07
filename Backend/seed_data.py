from pymongo import MongoClient
import os

# =============================================
# UAF DATABASE CONNECTION
# =============================================
# Apni connection string yahan paste karo
MONGO_URL = "mongodb+srv://admin:Admin%40789789@agri-university.rifqtjj.mongodb.net/?appName=agri-university"

client = MongoClient(MONGO_URL)
db = client["uaf_db"]

# =============================================
# STEP 1: Pehle purana data delete karo (fresh start)
# =============================================
db.programs.drop()
db.faqs.drop()
print("🗑️  Old data cleared!")

# =============================================
# STEP 2: Programs Data — UAF Official PDF se liya
# =============================================
programs = [

    # ─── FACULTY OF SCIENCES ───
    {
        "program_name": "BS Computer Science",
        "degree": "BS",
        "faculty": "Faculty of Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Community College PARS", "Toba Tek Singh", "Burewala", "Depalpur"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate / 12 years schooling / A-Level (HSSC)",
            "note": "Students without Mathematics at Intermediate level must pass deficiency courses of Mathematics (6 credits) in first two semesters.",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science",
            "English, Mathematics, Computer Science and Statistics",
            "English, Mathematics, Computer Science and Economics"
        ]
    },
    {
        "program_name": "BS Artificial Intelligence",
        "degree": "BS",
        "faculty": "Faculty of Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate / 12 years schooling / A-Level (HSSC)",
            "note": "Students without Mathematics at Intermediate level must pass deficiency courses of Mathematics (6 credits) in first two semesters.",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science",
            "English, Mathematics, Computer Science and Statistics",
            "English, Mathematics, Computer Science and Economics"
        ]
    },
    {
        "program_name": "BS Software Engineering",
        "degree": "BS",
        "faculty": "Faculty of Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Community College PARS", "Burewala"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate / 12 years schooling / A-Level (HSSC)",
            "note": "Students without Mathematics at Intermediate level must pass deficiency courses (6 credits) in first two semesters.",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science",
            "English, Mathematics, Computer Science and Statistics"
        ]
    },
    {
        "program_name": "BS Information Technology",
        "degree": "BS",
        "faculty": "Faculty of Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Toba Tek Singh", "Burewala", "Depalpur"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate / 12 years schooling / A-Level (HSSC)",
            "note": "Students without Mathematics at Intermediate must pass deficiency courses (6 credits).",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science",
            "English, Mathematics, Computer Science and Statistics"
        ]
    },
    {
        "program_name": "BS Data Science",
        "degree": "BS",
        "faculty": "Faculty of Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate / 12 years schooling / A-Level (HSSC)",
            "note": "Students without Mathematics at Intermediate must pass deficiency courses (6 credits).",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science",
            "English, Mathematics, Computer Science and Statistics"
        ]
    },
    {
        "program_name": "BS Bioinformatics",
        "degree": "BS",
        "faculty": "Faculty of Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate / 12 years schooling / A-Level (HSSC)",
            "note": "Students without Mathematics at Intermediate must pass deficiency courses (6 credits).",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics"
        ]
    },

    # ─── FACULTY OF AGRICULTURE ───
    {
        "program_name": "BSc (Hons) Agriculture",
        "degree": "BSc Hons",
        "faculty": "Faculty of Agriculture",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Burewala", "Depalpur"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "45% marks (495/1100) in Intermediate Science (Pre-Medical/Pre-Engineering) or 3-year Diploma of Agricultural Sciences (DAS), or Intermediate Pre-Agriculture with CGPA 2.20",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics",
            "English, Agronomy, Horticulture and Entomology (For DAS holders)"
        ]
    },
    {
        "program_name": "BS Forestry",
        "degree": "BS",
        "faculty": "Faculty of Agriculture",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "45% marks (495/1100) in Intermediate Science (Pre-Medical/Pre-Engineering) or DAS/DAE, or Intermediate Pre-Agriculture with CGPA 2.20",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics",
            "English, Agronomy, Horticulture and Entomology (For DAS)"
        ]
    },
    {
        "program_name": "BSc (Hons) Environmental Science",
        "degree": "BSc Hons",
        "faculty": "Faculty of Agriculture",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate Science (Pre-Medical/Pre-Engineering), or Intermediate Pre-Agriculture with CGPA 2.50",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics"
        ]
    },

    # ─── FACULTY OF VETERINARY SCIENCE ───
    {
        "program_name": "Doctor of Veterinary Medicine (DVM)",
        "degree": "DVM",
        "faculty": "Faculty of Veterinary Science",
        "duration": "5 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate Science (Pre-Medical)",
            "note": "Minimum 50% marks compulsory in Entry Test.",
            "entry_test_required": True,
            "uaf_students_entry_test": True
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology"
        ]
    },
    {
        "program_name": "Doctor of Pharmacy (Pharm.D)",
        "degree": "Pharm.D",
        "faculty": "Faculty of Veterinary Science",
        "duration": "5 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate Science (Pre-Medical)",
            "note": "Minimum 50% marks compulsory in Entry Test.",
            "entry_test_required": True,
            "uaf_students_entry_test": True
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology"
        ]
    },
    {
        "program_name": "BSc (Hons) Microbiology",
        "degree": "BSc Hons",
        "faculty": "Faculty of Veterinary Science",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks (550/1100) in Intermediate Science (Pre-Medical) or equivalent",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology"
        ]
    },

    # ─── FACULTY OF ENGINEERING & TECHNOLOGY ───
    {
        "program_name": "BSc Agricultural Engineering",
        "degree": "BSc Engineering",
        "faculty": "Faculty of Agricultural Engineering & Technology",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate Science (Pre-Engineering) / Physics+Math+CS / ICS / DAE in Civil, Mechanical, Auto & Farm Machinery",
            "note": "Minimum 33% marks compulsory in Entry Test.",
            "entry_test_required": True,
            "uaf_students_entry_test": True
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science"
        ]
    },
    {
        "program_name": "BSc Food Engineering",
        "degree": "BSc Engineering",
        "faculty": "Faculty of Agricultural Engineering & Technology",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate (Pre-Engineering) / ICS / DAE in Chemical, Food & Mechanical, Food Processing",
            "note": "Minimum 33% marks compulsory in Entry Test.",
            "entry_test_required": True,
            "uaf_students_entry_test": True
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science"
        ]
    },
    {
        "program_name": "BSc Energy Systems Engineering",
        "degree": "BSc Engineering",
        "faculty": "Faculty of Agricultural Engineering & Technology",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad"],
        "session": "Morning",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate (Pre-Engineering) / ICS / DAE in Electrical, Electronics, Mechanical, Telecommunication",
            "note": "Minimum 33% marks compulsory in Entry Test.",
            "entry_test_required": True,
            "uaf_students_entry_test": True
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Mathematics",
            "English, Physics, Mathematics and Computer Science"
        ]
    },

    # ─── FACULTY OF ANIMAL HUSBANDRY ───
    {
        "program_name": "BS Animal Sciences",
        "degree": "BS",
        "faculty": "Faculty of Animal Husbandry",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Toba Tek Singh"],
        "session": "Morning",
        "eligibility": {
            "minimum_marks": "50% marks (550/1100) in Intermediate Science (Pre-Medical) or Intermediate Pre-Agriculture with CGPA 2.20",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology"
        ]
    },

    # ─── FACULTY OF SOCIAL SCIENCES ───
    {
        "program_name": "BBA (Bachelor of Business Administration)",
        "degree": "BBA",
        "faculty": "Faculty of Social Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Toba Tek Singh", "Burewala"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "50% marks in Intermediate (12 years schooling) or Intermediate Pre-Agriculture with CGPA 2.20",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics",
            "English, Account, Banking and Business Mathematics",
            "English, Account, Economics and Business Mathematics"
        ]
    },
    {
        "program_name": "BBA Agribusiness",
        "degree": "BBA",
        "faculty": "Faculty of Social Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Burewala", "Depalpur"],
        "session": "Morning",
        "eligibility": {
            "minimum_marks": "50% marks (550/1100) in Intermediate (12 years schooling) or Intermediate Pre-Agriculture with CGPA 2.20",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics"
        ]
    },

    # ─── FACULTY OF FOOD, NUTRITION & HOME SCIENCES ───
    {
        "program_name": "BSc (Hons) Food Science & Technology",
        "degree": "BSc Hons",
        "faculty": "Faculty of Food, Nutrition & Home Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Burewala", "Depalpur"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate Science (Pre-Medical/Pre-Engineering) or DAE in Food Technology, or Intermediate Pre-Agriculture with CGPA 2.50",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology",
            "English, Physics, Chemistry and Mathematics"
        ]
    },
    {
        "program_name": "BSc (Hons) Human Nutrition & Dietetics",
        "degree": "BSc Hons",
        "faculty": "Faculty of Food, Nutrition & Home Sciences",
        "duration": "4 Years",
        "campus": ["Main Campus Faisalabad", "Toba Tek Singh", "Burewala"],
        "session": "Morning & Evening",
        "eligibility": {
            "minimum_marks": "60% marks (660/1100) in Intermediate Science (Pre-Medical), or Intermediate Pre-Agriculture with CGPA 2.50",
            "entry_test_required": True,
            "uaf_students_entry_test": False
        },
        "entry_test_streams": [
            "English, Physics, Chemistry and Biology"
        ]
    },
]

# =============================================
# STEP 3: FAQs — Common Questions
# =============================================
faqs = [
    {
        "question": "UAF mein admission kab hota hai?",
        "answer": "UAF mein admission Fall semester mein hota hai. Entry test ke liye pehli registration June ke aakhir tak hoti hai, doosri July mein. Admission online portal se hota hai: admissions.uaf.edu.pk"
    },
    {
        "question": "UAF ka admission portal kya hai?",
        "answer": "UAF ka official admission portal yeh hai: admissions.uaf.edu.pk — wahan jaake online apply kar sakte ho."
    },
    {
        "question": "Kya UAF mein entry test hota hai?",
        "answer": "Haan, zyada tar programs mein entry test hota hai. Engineering programs mein 33% aur DVM/Pharm.D mein 50% minimum marks compulsory hain. CS, IT, AI jaise programs mein UAF students ko entry test nahi dena hota."
    },
    {
        "question": "UAF ka address kya hai?",
        "answer": "University of Agriculture, Agriculture University Road, Faisalabad, Pakistan. Zip Code: 38000"
    },
    {
        "question": "UAF mein kitne campuses hain?",
        "answer": "UAF ke 4 campuses hain: Main Campus Faisalabad, Toba Tek Singh Campus, Burewala (Vehari) Campus, aur Depalpur Campus."
    },
    {
        "question": "CS ke liye FSc mein kaunse subjects chahiye?",
        "answer": "BS CS ke liye minimum 50% marks chahiye. Agar Mathematics nahi padhi intermediate mein toh university mein deficiency courses karni hongi pehle 2 semesters mein."
    }
]

# =============================================
# STEP 4: Data Insert Karo
# =============================================
db.programs.insert_many(programs)
print(f"✅ {len(programs)} programs successfully added to MongoDB!")

db.faqs.insert_many(faqs)
print(f"✅ {len(faqs)} FAQs successfully added!")

print("\n🎉 UAF Database ready hai! Ab agent chalao.")

# Connection close karo
client.close()