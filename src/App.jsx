import React, { useState } from 'react';

const chapters = [
  {
    chapter: 38,
    questions: [
  {
    question: "The area of the kidney that contains the glomeruli and portions of the tubules is the:",
    options: ["Medulla", "Cortex", "Pyramid", "Columns"],
    answer: 1,
    rationale: "The cortex contains the glomeruli and tubules. The medulla, pyramids, and columns do not contain glomeruli."
  },
  {
    question: "What is the functional unit of the kidney?",
    options: ["Glomerulus", "Nephron", "Collecting duct", "Pyramid"],
    answer: 1,
    rationale: "The nephron is the functional unit; others are important but not functional units."
  },
  {
        question: "Which cells have phagocytic properties and regulate capillary blood flow?",
        options: ["Principle cells", "Podocytes", "Mesangial cells", "Intercalated cells"],
        answer: 2,
        rationale: "Mesangial cells regulate capillary blood flow and have phagocytic activity."
  },
  {
        question: "The only surface inside the nephron with microvilli (brush border) is the:",
        options: ["Proximal convoluted tubule", "Distal tubule", "Ascending loop of Henle", "Descending loop of Henle"],
        answer: 0,
        rationale: "The proximal convoluted tubule has cuboidal cells with a brush border to increase reabsorption surface area."
  },
  {
        question: "What part of the kidney controls renal blood flow, GFR, and renin secretion?",
        options: ["Macula densa", "Visceral epithelium", "Juxtaglomerular apparatus (JGA)", "Filtration slits"],
        answer: 2,
        rationale: "The JGA regulates renal blood flow, GFR, and renin secretion."
  },
  {
        question: "Kidney stones in the upper ureter would cause referred pain in the:",
        options: ["Vulva or penis", "Umbilicus", "Thighs", "Lower abdomen"],
        answer: 1,
    rationale: "Pain from stones in the upper ureter is referred to the umbilicus due to sensory innervation."
  },
  {
        question: "Innervation of the bladder and internal urethral sphincter is supplied by:",
        options: ["Peripheral nerves", "Parasympathetic fibers", "Sympathetic nervous system", "Thoracic nerves"],
        answer: 1,
        rationale: "Parasympathetic fibers of the ANS innervate the bladder and sphincter."
  },
  {
        question: "How much urine accumulates in the bladder before stretch receptors trigger micturition?",
        options: ["75–100 ml", "100–150 ml", "250–300 ml", "350–400 ml"],
        answer: 2,
        rationale: "Stretch receptors activate at ~250–300 ml, triggering the micturition reflex."
  },
  {
        question: "What is the trigone?",
        options: ["Smooth muscle around urethra", "Inner mucosal lining", "Smooth triangular area between ureter openings and urethra", "Loop of Henle division"],
        answer: 2,
        rationale: "The trigone is the smooth triangular region between the ureteral orifices and urethra."
  },
  {
        question: "GFR is directly related to which factor?",
        options: ["Perfusion pressure in glomerular capillaries", "Diffusion in cortex", "Diffusion in medulla", "Active transport"],
        answer: 0,
        rationale: "GFR is determined by perfusion pressure in glomerular capillaries."
  },
  {
        question: "On average, what % of cardiac output goes to the kidneys?",
        options: ["10–20%", "15–20%", "20–25%", "30–35%"],
        answer: 2,
        rationale: "Kidneys receive ~1000–1200 ml/min, or ~20–25% of cardiac output."
  },
  {
        question: "Exercise and posture change renal blood flow by:",
        options: ["Activating parasympathetic neurons → mild vasoconstriction", "Activating sympathetic neurons → mild vasoconstriction", "Both activate parasympathetic", "Both activate sympathetic → vasodilation"],
        answer: 1,
        rationale: "Sympathetic activation reduces renal blood flow with exercise/posture changes."
  },
  {
        question: "Blood vessels of kidneys are innervated by:",
        options: ["Vagus nerve", "Sympathetic nervous system", "Somatic nervous system", "Parasympathetic nervous system"],
        answer: 1,
    rationale: "Sympathetic adrenergic fibers cause vasoconstriction and reduce blood flow."
  },
  {
        question: "When renin is released, what action occurs?",
        options: ["Natriuresis", "Direct activation of angiotensin II", "ADH release", "Cleaves angiotensinogen → angiotensin I"],
        answer: 3,
        rationale: "Renin cleaves angiotensinogen to form angiotensin I."
  },
  {
        question: "Effect of natriuretic peptides during heart failure dilation?",
        options: ["Stimulate antidiuretic hormone", "Stimulate renin & aldosterone", "Inhibit ADH", "Inhibit renin & aldosterone"],
        answer: 3,
    rationale: "Natriuretic peptides inhibit renin and aldosterone, promoting natriuresis and diuresis."
  },
  {
        question: "Direct action of atrial natriuretic hormone?",
        options: ["Sodium retention", "Sodium excretion", "Water retention", "Water excretion"],
        answer: 1,
    rationale: "ANP and BNP promote sodium excretion."
  },
  {
        question: "Movement of solutes/fluids from tubule to peritubular plasma?",
        options: ["Tubular secretion", "Ultrafiltration", "Tubular reabsorption", "Tubular excretion"],
        answer: 2,
        rationale: "Tubular reabsorption = movement of solutes/fluid from tubule to plasma."
  },
      {
        question: "Plasma glucose threshold before glucose appears in urine?",
        options: ["126 mg/dl", "150 mg/dl", "180 mg/dl", "200 mg/dl"],
        answer: 2,
        rationale: "Glucosuria occurs when plasma glucose >180 mg/dl."
      },
      {
        question: "Which hormone is required for water reabsorption in distal tubule/collecting duct?",
        options: ["Antidiuretic hormone (ADH)", "Aldosterone", "Cortisol", "Adrenocorticotropic hormone"],
        answer: 0,
        rationale: "ADH makes distal tubule/collecting duct permeable to water."
      },
      {
        question: "Which glycoprotein protects against urolithiasis and is ligand for lymphokines?",
        options: ["Uromodulin (Tamm-Horsfall protein)", "Nephrin", "Urocystatin", "Cystatin"],
        answer: 0,
        rationale: "Uromodulin protects against infection, urolithiasis, and binds lymphokines."
      },
      {
        question: "End product of protein metabolism in urine?",
        options: ["Glucose", "Ketones", "Bile", "Urea"],
        answer: 3,
        rationale: "Urea is the major nitrogenous end product excreted in urine."
      },
      {
        question: "Action of urodilatin?",
        options: ["Vasoconstriction of afferent arterioles", "Vasodilation of efferent arterioles", "Inhibits renin secretion", "Inhibits sodium/water reabsorption"],
        answer: 3,
        rationale: "Urodilatin inhibits Na⁺/water reabsorption, promoting diuresis."
      },
      {
        question: "Which gland secretes ADH?",
        options: ["Posterior pituitary", "Thyroid", "Parathyroid", "Anterior pituitary"],
        answer: 0,
        rationale: "ADH is secreted from posterior pituitary."
      },
      {
        question: "Which statement is true regarding urodilatin?",
        options: ["Inhibits NaCl & water reabsorption in medullary collecting duct", "Stimulated by ADH", "Stimulated by low BP", "Stimulated by low volume"],
        answer: 0,
        rationale: "Urodilatin is secreted in response to high BP/volume and inhibits Na⁺/water reabsorption."
      },
      {
        question: "Substance stimulating renal hydroxylation in vitamin D production?",
        options: ["Erythropoietin", "Thyroid hormone", "Calcitonin", "Parathyroid hormone (PTH)"],
        answer: 3,
        rationale: "PTH stimulates hydroxylation in kidney for active vitamin D."
      },
      {
        question: "Which hormone is synthesized and secreted by kidneys?",
        options: ["ADH", "Aldosterone", "Erythropoietin", "Angiotensinogen"],
        answer: 2,
        rationale: "Kidneys produce erythropoietin."
      },
      {
        question: "Best estimate of renal function?",
        options: ["GFR", "BUN/Cr", "Serum creatinine", "Specific gravity"],
        answer: 0,
        rationale: "GFR best reflects renal function."
      },
      {
        question: "Renal change in older adults?",
        options: ["Sharp GFR decline", "Sharp renal blood flow decline", "Decrease in number of nephrons", "Decrease in urine output"],
        answer: 2,
        rationale: "Aging reduces nephron number."
      },
      {
        question: "Specific gravity of urine in older adults?",
        options: ["High normal", "Increased", "Low normal", "Increased"],
        answer: 2,
        rationale: "Older adults tend to have lower urine specific gravity."
      },
      {
        question: "How do kidneys respond to increased workload?",
        options: ["GFR", "Vitamin D3 secretion", "Increased renin", "Compensatory hypertrophy"],
        answer: 3,
        rationale: "Compensatory hypertrophy helps kidneys adapt to workload."
      },
      {
        question: "Which process allows ureter transplantation success?",
        options: ["Compensatory hypertrophy", "Erythropoietin", "Peristalsis", "Collateral circulation"],
        answer: 2,
        rationale: "Ureter peristalsis continues even when denervated."
      },
      {
        question: "Which structures are part of nephron? (Select all)",
        options: ["Loop of Henle", "Renal corpuscle", "Proximal convoluted tubule", "Calyx", "Collecting duct"],
        answer: [0,1,2,4],
        rationale: "Nephron includes renal corpuscle, tubules, loop, and collecting duct. Calyx is not."
      },
      {
        question: "Which forces create passive transport in proximal tubule? (Select all)",
        options: ["Peritubular hydrostatic", "Peritubular oncotic", "Interstitial hydrostatic", "Interstitial osmotic", "Peritubular osmotic"],
        answer: [1,4],
        rationale: "Passive transport depends on oncotic/osmotic gradients, not hydrostatic."
      },
      {
        question: "Which hormones are produced by kidney? (Select all)",
        options: ["Renin", "Erythropoietin", "1,25-dihydroxyvitamin D3", "Calcitonin", "Aldosterone"],
        answer: [0,1,2],
        rationale: "Kidneys secrete renin, EPO, and calcitriol. Calcitonin and aldosterone come from other glands."
      },
      {
        question: "Which statements are true of renal circulation? (Select all)",
        options: ["Interlobar arteries travel down renal columns", "Interlobar branch to form arcuate", "Arcuate arteries arch over base of pyramids", "Interlobar run parallel", "Interlobar run between pyramids"],
        answer: [0,2,4],
        rationale: "Interlobar arteries travel down renal columns and between pyramids; arcuate arch at base."
      },
      {
        question: "Matching: 36. Crystals → Form in concentrated acidic/alkaline urine (B)\n37. Casts → Cylindrical with distinct borders (C)\n38. Leukocytes → Pyuria (E)\n39. Creatinine clearance → Good estimate of GFR (A)\n40. Erythrocytes → Hematuria (D)",
        options: ["Crystals → Form in concentrated acidic/alkaline urine (B)", "Casts → Cylindrical with distinct borders (C)", "Leukocytes → Pyuria (E)", "Creatinine clearance → Good estimate of GFR (A)", "Erythrocytes → Hematuria (D)"],
        answer: [0,1,2,3,4],
        rationale: "Matching: Crystals → B; Casts → C; Leukocytes → E; Creatinine clearance → A; Erythrocytes → D."
      }
    ]
  },
  {
    chapter: 37,
    questions: [
      {
        question: "How does chest wall compliance in an infant differ from that of an adult?",
        options: ["An adult’s chest wall compliance is lower than an infant’s.", "An adult’s chest wall compliance is higher than an infant’s.", "An adult’s chest wall compliance is the same as an infant’s.", "An adult’s chest wall compliance is dissimilar to that of an infant’s."],
        answer: 0,
        rationale: "Infants have higher chest wall compliance than adults, especially premature infants."
      },
      {
        question: "Why is nasal congestion a serious threat to young infants?",
        options: ["Infants are obligatory nose breathers.", "Their noses are small in diameter.", "Infants become dehydrated when mouth breathing.", "Their epiglottis is proportionally greater than that of an adult."],
        answer: 0,
        rationale: "Infants up to 2–3 months old are obligatory nose breathers."
      },
      {
        question: "The risk for respiratory distress syndrome (RDS) decreases for premature infants born between how many weeks of gestation?",
        options: ["16 and 20", "20 and 24", "24 and 30", "30 and 36"],
        answer: 3,
        rationale: "Surfactant secretion begins between 30–36 weeks."
      },
      {
        question: "Which type of croup is most common?",
        options: ["Bacterial", "Viral", "Fungal", "Autoimmune"],
        answer: 1,
        rationale: "Viral, most often parainfluenza virus."
      },
      {
        question: "What is the chief predisposing factor for RDS of the newborn?",
        options: ["Low birth weight", "Alcohol consumption during pregnancy", "Premature birth", "Smoking during pregnancy"],
        answer: 2,
        rationale: "Prematurity is the leading risk factor."
      },
      {
        question: "What is the primary cause of RDS of the newborn?",
        options: ["Immature immune system", "Small alveoli", "Surfactant deficiency", "Anemia"],
        answer: 2,
        rationale: "Caused primarily by surfactant deficiency."
      },
      {
        question: "What is the main problem resulting from RDS?",
        options: ["Consolidation", "Pulmonary edema", "Atelectasis", "Bronchiolar plugging"],
        answer: 2,
        rationale: "Atelectasis with hypoxemia and difficulty inflating alveoli."
      },
      {
        question: "Which sequence occurs after atelectasis in RDS?",
        options: ["Increased pulmonary vascular resistance, atelectasis, hypoperfusion", "Hypoxic vasoconstriction, right-to-left shunting, hypoperfusion", "Respiratory acidosis, hypoxemia, hypercapnia", "Right-to-left shunt, hypoxic vasoconstriction, hypoperfusion"],
        answer: 1,
        rationale: "Hypoxic vasoconstriction, right-to-left shunting, hypoperfusion."
      },
      {
        question: "Which statement about advances in RDS treatment is incorrect?",
        options: ["Administering glucocorticoids to women before preterm labor accelerates fetal lung maturation.", "Administering oxygen to mothers during preterm labor increases fetal oxygenation.", "Exogenous surfactant can be instilled into an endotracheal tube of premature infants.", "CPAP helps support infant respiration."],
        answer: 1,
        rationale: "Oxygen to mother does not treat fetal RDS."
      },
      {
        question: "Bronchiolitis in the first year of life is most often caused by:",
        options: ["Respiratory syncytial virus (RSV)", "Influenza virus", "Adenoviruses", "Rhinovirus"],
        answer: 0,
        rationale: "Respiratory syncytial virus (RSV) is the most common cause of bronchiolitis in infants."
      }
    ]
  },
  {
    chapter: 35,
    questions: [
      {
        question: "What pulmonary defense mechanism propels a mucous blanket that entraps particles moving toward the oropharynx?",
        options: ["Nasal turbinates", "Alveolar macrophages", "Cilia", "Irritant receptors on the nares"],
        answer: 2,
        rationale: "Cilia beat rhythmically to move mucus and trapped particles toward the oropharynx."
      },
      {
        question: "Which term is used to identify the movement of gas and air into and out of the lungs?",
        options: ["Perfusion", "Ventilation", "Respiration", "Diffusion"],
        answer: 1,
        rationale: "Ventilation refers to movement of air into and out of the lungs."
      },
      {
        question: "When an individual aspirates food particles, where would the nurse expect to hear decreased or absent breath sounds?",
        options: ["Left lung", "Right lung", "Trachea", "Carina"],
        answer: 1,
        rationale: "Right mainstem bronchus is wider, shorter, and more vertical."
      },
      {
        question: "Aspiration is most likely to occur in the right mainstem bronchus because it:",
        options: ["Extends vertically from the trachea", "Is narrower than the left bronchus", "Comes into contact with food and drink first", "Is located at the bronchial bifurcation"],
        answer: 0,
        rationale: "Right bronchus anatomy favors aspiration."
      },
      {
        question: "Air passage among alveoli is collateral and evenly distributed because of which structures?",
        options: ["Type I alveolar cells", "Pores of Kohn", "Acinus pores", "Alveolar pores"],
        answer: 1,
        rationale: "Pores of Kohn allow airflow between alveoli."
      },
      {
        question: "Where in the lungs does gas exchange occur?",
        options: ["Trachea", "Segmental bronchi", "Alveolocapillary membrane", "Main bronchus"],
        answer: 2,
        rationale: "Gas exchange occurs at the alveolocapillary membrane."
      },
      {
        question: "Surfactant produced by type II alveolar cells facilitates alveolar distention and ventilation by which mechanism?",
        options: ["Decreasing thoracic compliance", "Attracting water to alveolar surface", "Decreasing surface tension", "Increasing surface tension"],
        answer: 2,
        rationale: "Surfactant decreases surface tension."
      },
      {
        question: "Which part of the brainstem provides the basic automatic rhythm of respiration by sending efferent impulses to the diaphragm and intercostal muscles?",
        options: ["Dorsal respiratory group (DRG)", "Ventral respiratory group", "Pneumotaxic center", "Apneustic center"],
        answer: 0,
        rationale: "DRG provides basic automatic rhythm of respiration."
      },
      {
        question: "Which structures secrete surfactant?",
        options: ["Type I alveolar cells", "Type II alveolar cells", "Alveolar macrophages", "Stretch receptors"],
        answer: 1,
        rationale: "Type II alveolar cells secrete surfactant."
      },
      {
        question: "Which structure is not associated with lymphatic vessels?",
        options: ["Trachea", "Bronchi", "Acinus", "Terminal bronchioles"],
        answer: 2,
        rationale: "Acinus is not associated with lymphatic vessels."
      },
      {
        question: "Which describes the pressure in the pleural space?",
        options: ["Atmospheric", "Below atmospheric", "Above atmospheric", "Variable"],
        answer: 1,
        rationale: "Pleural pressure is below atmospheric."
      },
      {
        question: "The adequacy of alveolar ventilation is assessed best by monitoring which mechanism?",
        options: ["Ventilatory rate", "Ventilatory pattern", "Respiratory effort", "Arterial blood gas"],
        answer: 3,
        rationale: "Arterial blood gas best assesses alveolar ventilation."
      },
      {
        question: "Which normal physiologic change occurs in the aging pulmonary system?",
        options: ["Decreased airflow resistance", "Fewer alveoli", "Stiffening of the chest wall", "Improved elastic recoil"],
        answer: 2,
        rationale: "Aging causes stiffening of the chest wall."
      },
      {
        question: "How is most oxygen in the blood transported?",
        options: ["Dissolved in plasma", "Bound to hemoglobin", "In the form of CO2", "Bound to albumin"],
        answer: 1,
        rationale: "Most oxygen is transported bound to hemoglobin."
      },
      {
        question: "Stretch receptors and peripheral chemoreceptors send afferent impulses to which brain location?",
        options: ["Pneumotaxic center (pons)", "Apneustic center (pons)", "Dorsal respiratory group (medulla)", "Ventral respiratory group (medulla)"],
        answer: 2,
        rationale: "Afferent impulses go to the DRG in the medulla."
      },
      {
        question: "Which substances cause airway epithelium to constrict?",
        options: ["Epinephrine, acetylcholine", "Histamine, prostaglandin", "Bradykinin, thromboxane A", "Leukotrienes, prostacyclin"],
        answer: 1,
        rationale: "Histamine and prostaglandin cause airway constriction."
      },
      {
        question: "If a patient develops acidosis, what shift in hemoglobin-oxygen dissociation is expected?",
        options: ["Right shift, releasing more O₂", "Left shift, holding O₂", "No change", "Diffusion block"],
        answer: 0,
        rationale: "Acidosis causes a right shift, releasing more O₂."
      },
      {
        question: "How is most carbon dioxide (CO₂) in the blood transported?",
        options: ["Attached to oxygen", "As bicarbonate", "With albumin", "Dissolved in plasma"],
        answer: 1,
        rationale: "Most CO₂ is transported as bicarbonate."
      },
      {
        question: "The sternocleidomastoid and scalene muscles are classified as:",
        options: ["Accessory inspiratory muscles", "Expiratory muscles", "Intercostals", "Muscles of inspiration"],
        answer: 0,
        rationale: "These are accessory inspiratory muscles."
      },
      {
        question: "An increase in surface tension caused by decreased surfactant results in:",
        options: ["Decreased alveolar macrophages", "Increased compliance", "Decreased alveolar collapse", "Increased alveolar fluid"],
        answer: 3,
        rationale: "Decreased surfactant increases alveolar fluid."
      },
      {
        question: "Decreased lung compliance means the lungs are:",
        options: ["Difficult to inflate", "Easy to inflate", "Stiffness-free", "Unable to diffuse oxygen"],
        answer: 0,
        rationale: "Decreased compliance means lungs are difficult to inflate."
      },
      {
        question: "The lung is innervated by the parasympathetic nervous system via which nerve?",
        options: ["Vagus", "Phrenic", "Brachial", "Pectoral"],
        answer: 0,
        rationale: "The vagus nerve innervates the lung."
      },
      {
        question: "What event is characteristic of Zone 1 of lung function?",
        options: ["Blood flow throughout", "Alveolar pressure > arterial pressure", "Capillaries collapse", "Flow throughout"],
        answer: 1,
        rationale: "Zone 1: alveolar pressure exceeds arterial pressure."
      },
      {
        question: "Hyperventilation with CO₂ retention stimulates which receptors?",
        options: ["Irritant", "Central chemoreceptors", "Stretch", "Peripheral chemoreceptors"],
        answer: 1,
        rationale: "Central chemoreceptors are stimulated by CO₂ retention."
      },
      {
        question: "Most important cause of pulmonary artery constriction?",
        options: ["Low alveolar PO₂", "Hyperventilation", "Respiratory alkalosis", "Epinephrine"],
        answer: 0,
        rationale: "Low alveolar PO₂ is the most important cause."
      },
      {
        question: "Where does the tracheal bifurcation occur?",
        options: ["Larynx", "Bronchi", "Carina", "Nasopharynx"],
        answer: 2,
        rationale: "Tracheal bifurcation occurs at the carina."
      },
      {
        question: "At what PaO₂ do peripheral chemoreceptors stimulate ventilation?",
        options: ["<100 mmHg", "<80 mmHg", "<70 mmHg", "<60 mmHg"],
        answer: 3,
        rationale: "Peripheral chemoreceptors stimulate ventilation at PaO₂ <60 mmHg."
      },
      {
        question: "Which receptors are located in smooth muscles of airways?",
        options: ["Central chemoreceptors", "Stretch receptors", "Peripheral chemoreceptors", "J-receptors"],
        answer: 1,
        rationale: "Stretch receptors are located in airway smooth muscle."
      },
      {
        question: "Which receptors are located near the respiratory center?",
        options: ["Peripheral chemoreceptors", "Stretch receptors", "Central chemoreceptors", "J-receptors"],
        answer: 2,
        rationale: "Central chemoreceptors are near the respiratory center."
      },
      {
        question: "Which receptors are in aortic bodies and carotids?",
        options: ["Central chemoreceptors", "Stretch receptors", "J-receptors", "Peripheral chemoreceptors"],
        answer: 3,
        rationale: "Peripheral chemoreceptors are in aortic bodies and carotids."
      },
      {
        question: "Purpose of spirometry measurement?",
        options: ["Assess hypoxia", "Volume/flow rate", "Gas diffusion", "pH and gas concentrations"],
        answer: 3,
        rationale: "Spirometry measures pH and gas concentrations."
      },
      {
        question: "Which structures are upper conducting airways? (Select all that apply)",
        options: ["Oropharynx", "Larynx", "Nasopharynx", "Trachea", "Bronchi"],
        answer: [0, 2],
        rationale: "Oropharynx and nasopharynx are upper conducting airways."
      },
      {
        question: "Regarding remodeling, which are true? (Select all that apply)",
        options: ["Involves airway walls", "Scarring/thickening", "Permanent change", "Causes pulmonary hypertension", "Increases blood flow"],
        answer: [0, 1, 2, 3],
        rationale: "Remodeling involves airway walls, scarring/thickening, permanent change, and causes pulmonary hypertension."
      },
      {
        question: "What are the effects of aging on the pulmonary system? (Select all that apply)",
        options: ["Decreased compliance", "Decreased recoil", "Reduced ventilatory reserve", "Decreased PaO₂", "Reduced rate"],
        answer: [0, 1, 2, 3],
        rationale: "Aging causes decreased compliance, recoil, ventilatory reserve, and PaO₂."
      },
      {
        question: "Match the receptor with its function: Irritant receptors, Stretch receptors, J-receptors, Peripheral chemoreceptors, Central chemoreceptors",
        options: ["Rapid shallow breathing", "Hering-Breuer reflex", "Initiates cough reflex", "Monitor PaO₂/CO₂, pH", "Monitor CSF pH"],
        answer: [0, 1, 2, 3, 4],
        rationale: "A. Irritant receptors → Rapid shallow breathing; B. Stretch receptors → Hering-Breuer reflex; C. J-receptors → Initiates cough reflex; D. Peripheral chemoreceptors → Monitor PaO₂/CO₂, pH; E. Central chemoreceptors → Monitor CSF pH."
      },
    ]
  },
  {
    chapter: 34,
    questions: [
      {
        question: "Most cardiovascular developments occur between which weeks of gestation?",
        options: ["Fourth and seventh weeks", "Eighth and tenth weeks", "Twelfth and fourteenth weeks", "Fifteenth and seventeenth weeks"],
        answer: 0,
        rationale: "Cardiogenesis begins around 3 weeks, but most major development occurs between 4–7 weeks."
      },
      {
        question: "Function of the foramen ovale in a fetus:",
        options: ["Right-to-left blood shunting", "Left-to-right blood shunting", "Blood flow from umbilical cord", "Blood flow to lungs"],
        answer: 0,
        rationale: "The foramen ovale allows blood to bypass the lungs via right-to-left shunting."
      },
      {
        question: "At birth, which statement is true?",
        options: ["Systemic resistance and pulmonary resistance fall", "Gas exchange shifts from placenta to lung", "Systemic resistance falls, pulmonary resistance rises", "Systemic resistance and pulmonary resistance rise"],
        answer: 1,
        rationale: "At birth, the infant shifts from placental oxygenation to pulmonary gas exchange."
      },
      {
        question: "When does systemic vascular resistance increase in infants?",
        options: ["One month before birth", "During labor", "One hour after birth", "When placenta removed"],
        answer: 3,
        rationale: "Removal of the low-resistance placenta doubles systemic vascular resistance."
      },
      {
        question: "Which event triggers acyanotic CHF?",
        options: ["Left-to-right shunts", "Right-to-left shunts", "Obstructive lesions", "Mixed lesions"],
        answer: 0,
        rationale: "Left-to-right shunts increase pulmonary blood flow, leading to CHF."
      },
      {
        question: "Older child with uncorrected septal defect develops cyanosis due to:",
        options: ["Right-to-left shunts", "Left-to-right shunts", "Obstructive lesions", "Mixed lesions"],
        answer: 0,
        rationale: "Pulmonary vascular resistance increases over time, reversing the shunt."
      },
      {
        question: "Which congenital defects are linked to trisomy 13, 18, and Down syndrome?",
        options: ["COA and PS", "VSD and PDA", "ASD and AVC defect", "Tetralogy of Fallot"],
        answer: 1,
        rationale: "Trisomies and Down syndrome commonly include VSD and PDA."
      },
      {
        question: "Continuous machine-type murmur, bounding pulses, CHF in infant =",
        options: ["ASD", "VSD", "PDA", "AVC"],
        answer: 2,
        rationale: "PDA causes continuous machine-like murmur and bounding pulses."
      },
      {
        question: "Crescendo-decrescendo ejection murmur between 2nd–3rd intercostal spaces, fixed split S2 =",
        options: ["ASD", "VSD", "PDA", "AVC"],
        answer: 0,
        rationale: "ASD causes systolic ejection murmur with fixed split of S2."
      },
      {
        question: "Loud holosystolic murmur at left lower sternal border radiating to neck =",
        options: ["ASD", "VSD", "PDA", "AVC"],
        answer: 1,
        rationale: "VSD produces harsh holosystolic murmur, often with thrill."
      },
      {
        question: "Location of COA:",
        options: ["Aortic arch only", "Proximal to brachiocephalic", "Between subclavian origin and ductus arteriosus", "Between celiac and renal arteries"],
        answer: 2,
        rationale: "Classic COA is just distal to subclavian origin, near ductus arteriosus."
      },
      {
        question: "Classic signs of COA:",
        options: ["Tetralogy of Fallot", "Aortic stenosis", "VSD", "COA"],
        answer: 3,
        rationale: "COA = upper extremity HTN, weak/absent femoral pulses, systolic murmur."
      },
      {
        question: "Initial manifestation of COA in neonates:",
        options: ["CHF", "Cor pulmonale", "Pulmonary HTN", "Renal HTN"],
        answer: 0,
        rationale: "Newborns with COA usually present with CHF."
      },
      {
        question: "Compensatory mechanism in Tetralogy of Fallot:",
        options: ["Lying left", "Valsalva", "Squatting", "Hyperventilation"],
        answer: 2,
        rationale: "Squatting ↑ systemic resistance, reduces right-to-left shunt."
      },
      {
        question: "Small PDA infant likely presents with:",
        options: ["Intermittent murmur", "Surgical repair need", "Triad of defects", "CHF"],
        answer: 0,
        rationale: "Small PDA is often asymptomatic with intermittent murmur."
      },
      {
        question: "Most common cause of neonatal sustained HTN:",
        options: ["Renal parenchymal disease", "Primary HTN", "Renal artery stenosis", "Congenital renal malformation"],
        answer: 2,
        rationale: "Renal artery stenosis is most common in newborn sustained HTN."
      },
      {
        question: "Transposition of great vessels:",
        options: ["Aorta arises from RV", "Pulmonary trunk from RV", "RV pumps to lungs", "Intermittent murmur"],
        answer: 0,
        rationale: "In TGA, aorta connects to RV and pulmonary artery to LV."
      },
      {
        question: "Total anomalous pulmonary venous return:",
        options: ["Foramen ovale closes", "Pulmonary veins drain to RA", "Pulmonary veins drain to LA", "IVC receives oxygenated blood"],
        answer: 1,
        rationale: "All pulmonary veins connect abnormally to RA/systemic veins."
      },
      {
        question: "Systolic ejection murmur at right upper sternal border radiating to neck =",
        options: ["COA", "Pulmonary stenosis", "Aortic stenosis", "HLHS"],
        answer: 2,
        rationale: "Aortic stenosis causes harsh ejection murmur at RUSB."
      },
      {
        question: "Systolic ejection click at upper LSB with thrill:",
        options: ["COA", "PS", "AS", "HLHS"],
        answer: 1,
        rationale: "Pulmonary stenosis causes systolic ejection click + thrill at LSB."
      },
      {
        question: "Single vessel supplying both systemic + pulmonary circulation =",
        options: ["COA", "TOF", "TAPVR", "Truncus arteriosus"],
        answer: 3,
        rationale: "Truncus arteriosus = failure of embryonic truncus to separate."
      },
      {
        question: "Suggested BP for 9-year-old child:",
        options: ["104/55 mm Hg", "106/58 mm Hg", "112/62 mm Hg", "121/70 mm Hg"],
        answer: 0,
        rationale: "Normal for 8–9 years = ~104/55."
      },
      {
        question: "Congenital defects associated with maternal rubella (select all):",
        options: ["PS", "Cardiomegaly", "PDA", "COA", "VSD"],
        answer: [0, 2, 3],
        rationale: "A, C, D: PS, PDA, COA are associated with maternal rubella."
      },
      {
        question: "Diagnostic criteria for Kawasaki disease (select all):",
        options: ["Fever ≥ 5 days", "Strawberry tongue", "Peripheral edema", "Lymphadenopathy", "Bilateral conjunctival injection"],
        answer: [0, 1, 2, 3, 4],
        rationale: "A, B, C, D, E: All listed are diagnostic criteria for Kawasaki disease."
      },
      {
        question: "ABPM statements true (select all):",
        options: ["Monitors BP for 24h", "Identifies white coat HTN", "Detects masked HTN", "Identifies high-risk organ damage", "Must be ≥ 48h"],
        answer: [0, 1, 2, 3],
        rationale: "A, B, C, D: ABPM monitors BP for 24h, identifies white coat and masked HTN, and detects high-risk organ damage."
      },
      {
        question: "Matching: ASD, Foramen ovale, Septum secundum, Ostium primum, Bulbus cordis",
        options: ["Causes atrial separation", "Gap between septum primum and secundum", "Conal portion of ventricular septum", "Abnormal communication between atria", "Allows right-to-left shunting"],
        answer: [3, 4, 0, 1, 2],
        rationale: "26. ASD → Abnormal communication between atria; 27. Foramen ovale → Allows right-to-left shunting; 28. Septum secundum → Causes atrial separation; 29. Ostium primum → Gap between septum primum and secundum; 30. Bulbus cordis → Conal portion of ventricular septum."
      }
    ]
  },
  {
    chapter: 9,
  questions: [
      {
        question: "Hypersensitivity is best defined as a(an):",
        options: [
          "Disturbance in the immunologic tolerance of self-antigens",
          "Immunologic reaction of one person to the tissue of another person",
          "Altered immunologic response to an antigen that results in disease",
          "Undetectable immune response in the presence of antigens"
        ],
        answer: 2,
        rationale: "Hypersensitivity is an altered immunologic response to an antigen that results in disease or damage to the host. The other options are not accurate definitions of hypersensitivity."
      },
      {
        question: "A hypersensitivity reaction that produces an allergic response is called:",
        options: [
          "Hemolytic shock",
          "Anaphylaxis",
          "Necrotizing vasculitis",
          "Systemic erythematosus"
        ],
        answer: 1,
        rationale: "Examples of systemic anaphylaxis are allergic reactions to beestings, peanuts, and fish. The other options are not accurate examples of hypersensitivity."
      },
      {
        question: "The common hay fever allergy is expressed through a reaction that is mediated by which class of immunoglobulins?",
        options: ["IgE", "IgG", "IgM", "T cells"],
        answer: 0,
        rationale: "Type I reactions are mediated by antigen-specific IgE and the products of tissue mast cells. The most common allergens (e.g., pollen allergies) are type I reactions."
      },
      {
        question: "Which type of antibody is involved in type I hypersensitivity reaction?",
        options: ["IgA", "IgE", "IgG", "IgM"],
        answer: 1,
        rationale: "Type I reactions are only mediated by antigen-specific IgE and the products of tissue mast cells."
      },
      {
        question: "Blood transfusion reactions are an example of:",
        options: ["Autoimmunity", "Alloimmunity", "Homommunity", "Hypersensitivity"],
        answer: 1,
        rationale: "Only alloimmunity (also termed isoimmunity) occurs when the immune system of one individual produces an immunologic reaction against tissues of another individual."
      },
      {
        question: "During an IgE-mediated hypersensitivity reaction, which leukocyte is activated?",
        options: ["Neutrophils", "Monocytes", "Eosinophils", "T lymphocytes"],
        answer: 2,
        rationale: "Of the options provided, only eosinophils are activated during IgE-mediated hypersensitivity reactions."
      },
      {
        question: "During an IgE-mediated hypersensitivity reaction, what causes bronchospasm?",
        options: [
          "Bronchial edema caused by the chemotactic factor of anaphylaxis",
          "Bronchial edema caused by binding of the cytotropic antibody",
          "Smooth muscle contraction caused by histamine bound to H1 receptors",
          "Smooth muscle contraction caused by histamine bound to H2 receptors"
        ],
        answer: 2,
        rationale: "During an IgE-mediated hypersensitivity reaction, only smooth muscle contraction caused by histamine bound to H1 receptors results in bronchospasm."
      },
      {
        question: "During an IgE-mediated hypersensitivity reaction, the degranulation of mast cells is a result of which receptor action?",
        options: ["Histamine bound to H2", "Chemotactic factor binding to the receptor", "Epinephrine bound to mast cells", "Acetylcholine bound to mast cells"],
        answer: 0,
        rationale: "Histamine bound to H1 results in the degranulation of mast cells during an IgE-mediated hypersensitivity reaction."
      },
      {
        question: "What characteristic do atopic individuals have that make them genetically predisposed to develop allergies?",
        options: ["Greater quantities of histamine", "More histamine receptors", "Greater quantities of IgE", "A deficiency in epinephrine"],
        answer: 2,
        rationale: "Atopic individuals tend to produce higher quantities of IgE and to have more Fc receptors for IgE on their mast cells."
      },
      {
        question: "What is the mechanism that results in type II hypersensitivity reactions?",
        options: [
          "Antibodies coat mast cells by binding to receptors that signal its degranulation, followed by discharge of preformed mediators.",
          "Antibodies bind to soluble antigens that were released into body fluids, and the immune complexes are then deposited in the tissues.",
          "Cytotoxic T lymphocytes or lymphokine-producing helper T1 cells directly attack and destroy cellular targets.",
          "Antibodies bind to the antigens on the cell surface."
        ],
        answer: 3,
        rationale: "The mechanism that results in a type II hypersensitivity reaction begins with antibody binding to tissue-specific antigens or antigens that have attached to particular tissues. The cell can then be destroyed by antibody IgG or IgM and activation of the complement cascade."
      },
      {
        question: "When mismatched blood is administered causing an ABO incompatibility, the erythrocytes are destroyed by:",
        options: ["Complement-mediated cell lysis", "Phagocytosis by macrophages", "Phagocytosis in the spleen", "Natural killer cells"],
        answer: 0,
        rationale: "Erythrocytes are destroyed by complement-mediated lysis in individuals with autoimmune hemolytic anemia or as a result of an alloimmune transfusion reaction to ABO-mismatched transfused blood cells."
      },
      {
        question: "When antibodies are formed against red blood cell antigens of the Rh system, the blood cells are destroyed by:",
        options: ["Complement-mediated cell lysis", "Phagocytosis by macrophages", "Phagocytosis in the spleen", "Neutrophil granules and toxic oxygen products"],
        answer: 2,
        rationale: "Antibodies against platelet-specific antigens or against red blood cell antigens of the Rh system coat those cells at low density, resulting in their preferential removal by phagocytosis in the spleen, rather than by complement-mediated lysis."
      },
      {
        question: "When soluble antigens from infectious agents enter circulation, tissue damage is a result of:",
        options: ["Complement-mediated cell lysis", "Phagocytosis by macrophages", "Phagocytosis in the spleen", "Neutrophil granules and toxic oxygen products"],
        answer: 3,
        rationale: "Of the options available, only the components of neutrophil granules damage the tissue."
      },
      {
        question: "How are target cells destroyed in a type II hypersensitivity reaction?",
        options: ["Complement-mediated cell lysis", "Phagocytosis by macrophages", "Neutrophil granules and toxic oxygen products", "Natural killer cells"],
        answer: 3,
        rationale: "The mechanism that results in a type II hypersensitivity reaction involves a subpopulation of cytotoxic cells that are non–antigen specific (natural killer [NK] cells)."
      },
      {
        question: "Graves disease (hyperthyroidism) is an example of which type II hypersensitivity reaction?",
        options: ["Modulation", "Antibody-dependent cell-mediated cytotoxicity", "Neutrophil-mediated damage", "Complement-mediated lysis"],
        answer: 0,
        rationale: "The antibody reacts with the receptors on the target cell surface and modulates the function of the receptor by preventing interactions with their normal ligand, replacing the ligand, or inappropriately stimulating the receptor or destroying the receptor. Example: Graves disease."
      },
      {
        question: "Type III hypersensitivity reactions are a result of which of the following?",
        options: [
          "Antibodies coating mast cells by binding to receptors that signal its degranulation, followed by the discharge of preformed mediators",
          "Antibodies binding to soluble antigens that were released into body fluids and the immune complexes being deposited in the tissues",
          "T cells or lymphokine-producing Th1 cells directly attacking and destroying cellular targets",
          "Antibodies binding to the antigen on the cell surface"
        ],
        answer: 1,
        rationale: "Antigen-antibody (immune) complexes that are formed in the circulation and then deposited later in vessel walls or extravascular tissues cause most type III hypersensitivity diseases."
      },
      {
        question: "A type IV hypersensitivity reaction causes which result?",
        options: [
          "Antibodies coat mast cells by binding to receptors that signal its degranulation, followed by discharge of preformed mediators",
          "Antibodies binding to soluble antigens that were released into body fluids and the immune complexes being deposited in the tissues",
          "Lymphokine-producing Th1 cells directly attacking and destroying cellular targets",
          "Antibodies binding to the antigen on the cell surface"
        ],
        answer: 2,
        rationale: "Type IV hypersensitivity reactions are mediated by T lymphocytes and do not involve antibodies."
      },
      {
        question: "In a type III hypersensitivity reaction, the harmful effects after the immune complexes that are deposited in tissues are a result of:",
        options: ["Cytotoxic T cells", "Natural killer cells", "Complement activation", "Degranulation of mast cells"],
        answer: 2,
        rationale: "Complement activation, particularly through the generation of chemotactic factors for neutrophils, causes the harmful effects of immune complex deposition."
      },
      {
        question: "Raynaud phenomenon is classified as a type III hypersensitivity reaction and is due to:",
        options: [
          "Immune complexes that are deposited in capillary beds, blocking circulation",
          "Mast cells bound to specific endothelial receptors, causing them to degranulate and creating localized inflammatory reaction",
          "Cytotoxic T cells that attack and destroy the capillaries so they are unable to perfuse local tissues",
          "Antibodies that detect the capillaries as foreign and destroy them"
        ],
        answer: 0,
        rationale: "Raynaud phenomenon is a condition caused by the temperature-dependent deposition of immune complexes in the capillary beds of the peripheral circulation."
      },
      {
        question: "Deficiencies in which element can produce depression of both B- and T-cell function?",
        options: ["Iron", "Zinc", "Iodine", "Magnesium"],
        answer: 1,
        rationale: "Of the options available, only deficient zinc intake can profoundly depress T- and B-cell function."
      },
      {
        question: "When the maternal immune system becomes sensitized against antigens expressed by the fetus, what reaction occurs?",
        options: ["T-cell immunity", "Alloimmunity", "Fetal immunity", "Autoimmunity"],
        answer: 1,
        rationale: "Alloimmunity occurs when an individual’s immune system reacts against antigens on the tissues of other members of the same species. Sensitization against fetal antigens is not the cause of any other available option."
      },
      {
        question: "Tissue damage caused by the deposition of circulating immune complexes containing an antibody against the host DNA is the cause of which disease?",
        options: ["Hemolytic anemia", "Pernicious anemia", "Systemic lupus erythematosus", "Myasthenia gravis"],
        answer: 2,
        rationale: "Only the deposition of circulating immune complexes containing an antibody against the host DNA produce tissue damage in individuals with systemic lupus erythematosus (SLE)."
      },
      {
        question: "Why does tissue damage occur in acute rejection after organ transplantation?",
        options: [
          "T H cells release cytokines that activate infiltrating macrophages, and cytotoxic T cells directly attack the endothelial cells of the transplanted tissue.",
          "Circulating immune complexes are deposited in the endothelial cells of transplanted tissue, where the complement cascade lyses tissues.",
          "Receptors on natural killer cells recognize antigens on the cell surface of transplanted tissue, which releases lysosomal enzymes that destroy tissue.",
          "Antibodies coat the surface of transplanted tissue to which mast cells bind and release preformed chemical mediators that destroy tissue."
        ],
        answer: 0,
        rationale: "A recipient’s lymphocytes interacting with the donor’s dendritic cells within the transplanted tissue usually initiates sensitization, resulting in the activation of recipient T H and T C cells against the donor’s antigens. The T H cells release cytokines that activate infiltrating macrophages, and the T C cells directly attack the endothelial cells in the transplanted tissue. The other options do not accurately describe how acute rejection after organ transplantation results in tissue damage."
      },
      {
        question: "Which blood cell carries the carbohydrate antigens for blood type?",
        options: ["Platelets", "Neutrophils", "Lymphocytes", "Erythrocytes"],
        answer: 3,
        rationale: "The reaction that causes a blood transfusion recipient’s red blood cells to clump together is related to the ABO antigens located on the surface of only erythrocytes."
      },
      {
        question: "A person with type O blood is likely to have high titers of which anti-antibodies?",
        options: ["A", "B", "A and B", "O"],
        answer: 2,
        rationale: "Type O individuals have neither A nor B antigen but have both anti-A and anti-B antibodies and therefore cannot accept blood from any of the other three types."
      },
      {
        question: "Which class of immunoglobulins forms isohemagglutinins?",
        options: ["IgA", "IgE", "IgG", "IgM"],
        answer: 3,
        rationale: "Naturally occurring antibodies, called isohemagglutinins, are immunoglobulins of only the IgM class."
      },
      {
        question: "Which component of the immune system is deficient in individuals with infections caused by viruses, fungi, or yeast?",
        options: ["Natural killer cells", "B cells", "Macrophages", "T cells"],
        answer: 3,
        rationale: "Of the available options, deficiencies in T-cell immune responses are suggested when certain viruses (e.g., varicella, vaccinia herpes, cytomegalovirus), fungi, and yeasts (e.g., Candida, Histoplasma) or certain atypical microorganisms (e.g., Pneumocystis jiroveci) cause recurrent infections."
      },
      {
        question: "How many months does it take for the newborn to be sufficiently protected by antibodies produced by its own B cells?",
        options: ["1 to 2", "4 to 5", "6 to 8", "10 to 12"],
        answer: 2,
        rationale: "By 6 to 8 months, the newborn should be efficiently protected by antibodies produced by its own B cells."
      },
      {
        question: "Considering the effects of nutritional deficiencies on the immune system, severe deficits in calories and protein lead to deficiencies in the formation of which immune cells?",
        options: ["B cells", "T cells", "Natural killer cells", "Neutrophils"],
        answer: 1,
        rationale: "Severe deficits in caloric or protein intake lead to deficiencies in T-cell function and numbers. The other options are not necessarily affected."
      },
      {
        question: "Urticaria is an manifestation of a which type of hypersensitivity reaction?",
        options: ["IV", "II", "I", "III"],
        answer: 2,
        rationale: "Urticaria, or hives, is a dermal (skin) manifestation of only type I allergic reactions."
      },
      {
        question: "Graves disease is a result of:",
        options: [
          "Increased levels of circulating immunoglobulins",
          "The infiltration of the thyroid with T lymphocytes",
          "Autoantibodies binding to thyroid-stimulating hormone (TSH)-receptor sites",
          "Exposure to acetylates in substances such as rubber"
        ],
        answer: 2,
        rationale: "In the hyperthyroidism (excessive thyroid activity) of Graves disease, autoantibody binds to and activates receptors for TSH (a pituitary hormone that controls hormone production by the thyroid)."
      },
      {
        question: "Raynaud phenomenon is an example of which type of hypersensitivity?",
        options: ["IV", "III", "II", "I"],
        answer: 1,
        rationale: "The characteristics of serum sickness are observed in only systemic type III autoimmune diseases such as Raynaud phenomenon."
      },
      {
        question: "Which statement is true concerning an atopic individual?",
        options: ["They tend to produce less IgE.", "They tend to produce more Fc receptors.", "They tend to attract very few mast cells.", "They tend to produce very high levels of IgM."],
        answer: 1,
        rationale: "Atopic individuals tend to produce higher quantities of IgE and have more Fc receptors for IgE on their mast cells."
      },
      {
        question: "Which statement is true regarding immunodeficiency?",
        options: ["Immunodeficiency is generally not present in other family members.", "Immunodeficiency is never acquired, rather, it is congenital.", "Immunodeficiency is almost immediately symptomatic.", "Immunodeficiency is a result of a potential mutation."],
        answer: 0,
        rationale: "Usually, the mutations are sporadic and not inherited; a family history exists in only approximately 25% of individuals. The sporadic mutations occur before or after birth, but the onset of symptoms may be early or later, depending on the particular syndrome. The immunodeficiency can be either congenital or acquired."
      },
      {
        question: "A person with type O blood is considered to be the universal blood donor because type O blood contains which of the following?",
        options: ["No antigens", "No antibodies", "Both A and B antigens", "Both A and B antibodies"],
        answer: 0,
        rationale: "Because individuals with type O blood lack both types of antigens, they are considered universal donors. Type O individuals, who have neither A nor B antigen but have both anti-A and anti-B antibodies, cannot accept blood from any of the other three types."
      },
      {
        question: "Immunoglobulin E (IgE) is associated with which type of hypersensitivity reaction?",
        options: ["I", "II", "III", "IV"],
        answer: 0,
        rationale: "Hypersensitivity reactions have been divided into four distinct types: type I (IgE-mediated) hypersensitivity reactions, type II (tissue-specific) hypersensitivity reactions, type III (immune complex–mediated) hypersensitivity reactions, and type IV (cell-mediated) hypersensitivity reactions."
      },
      {
        question: "Graves disease is an autoimmune disease that results in which external antibody?",
        options: [
          "Binding with receptors for neural transmitters on muscle cells, causing acetylcholine muscular weakness",
          "Affecting the receptor for TSH, causing neonatal hyperthyroidism",
          "Inducing anomalies in the fetus or causing pregnancy loss",
          "Destroying platelets in the fetus and neonate"
        ],
        answer: 1,
        rationale: "Graves disease is an autoimmune disease in which maternal antibody against the receptor for TSH causes neonatal hyperthyroidism."
      },
      {
        question: "When a tuberculin skin test is positive, the hard center and erythema surrounding the incision are a result of which of the following? (Select all that apply.)",
        options: ["Histamine", "Products of complement", "Lymphocytes", "Macrophages", "Immune complexes"],
        answer: [1, 3],
        rationale: "The reaction site is infiltrated with only T lymphocytes and macrophages, resulting in a clear hard center (induration) and a reddish surrounding area (erythema)."
      },
      {
        question: "Exposure to which of the following could result in a type IV hypersensitivity reaction? (Select all that apply.)",
        options: ["Poison ivy", "Neomycin", "Nickel", "Detergents", "Dairy products"],
        answer: [0, 1, 3, 4],
        rationale: "Allergens that primarily elicit type IV allergic hypersensitivities include plant resins (e.g., poison ivy, poison oak); metals (e.g., nickel, chromium); acetylates and chemicals in rubber, cosmetics, detergents; and topical antibiotics (e.g., neomycin)."
      },
      {
        question: "Which disorders are considered autoimmune? (Select all that apply.)",
        options: ["Crohn disease", "Addison disease", "Systemic lupus erythematosus", "Noninsulin-dependent diabetes", "Rheumatoid arthritis"],
        answer: [0, 1, 2, 3],
        rationale: "Crohn disease, Addison disease, rheumatoid arthritis, and systemic lupus erythematosus are all diseases that result from autoimmune pathologic conditions. Insulin-dependent diabetes is also an autoimmune disorder, but noninsulin-dependent diabetes is not."
      },
      {
        question: "Which statements best define acute rejection? (Select all that apply.)",
        options: ["Acute rejection is a cell-mediated immune response.", "Acute rejection is usually a type III rejection.", "Immunosuppressive drugs delay or lessen the intensity of an acute rejection.", "Acute rejection is associated with the body’s response to an organ transplant.", "Acute rejection is a response against unmatched human leukocyte antigens (HLAs)."],
        answer: [0, 2, 3, 4],
        rationale: "Acute rejection is primarily a cell-mediated immune response that occurs within days to months after transplantation. This type of rejection occurs when the recipient develops an immune response against unmatched HLAs after transplantation."
      }
    ]
  },
  {
    chapter: 28,
    questions: [
      {
        question: "What is the most abundant class of plasma protein?",
        options: ["Globulin", "Albumin", "Clotting factors", "Complement proteins"],
        answer: 1,
        rationale: "Albumin (~60% of total plasma protein at a concentration of about 4 g/dl) is the most abundant plasma protein."
      },
      {
        question: "What is the effect of low plasma albumin?",
        options: [
          "Clotting factors decrease, thus increasing chance of prolonged bleeding.",
          "Fewer immunoglobulins synthesized, impairing immune function.",
          "Less iron stored, increasing iron deficiency anemia.",
          "Osmotic pressure decreases, water moves into interstitium."
        ],
        answer: 3,
        rationale: "Low albumin decreases oncotic pressure → fluid moves into tissues → decreased blood volume."
      },
      {
        question: "What is the life span of an erythrocyte (in days)?",
        options: ["20–30", "60–90", "100–120", "200–240"],
        answer: 2,
        rationale: "Because erythrocytes cannot undergo mitosis, life span is ~120 days."
      },
      {
        question: "Which statement concerning erythrocytes is true?",
        options: [
          "Erythrocytes contain a nucleus, mitochondria, and ribosomes.",
          "Erythrocytes synthesize proteins.",
          "Erythrocytes deform to squeeze through capillaries.",
          "Erythrocyte colony-stimulating factor stimulates activity."
        ],
        answer: 2,
        rationale: "Reversible deformity enables erythrocytes to assume torpedo-like shape and squeeze through circulation."
      },
      {
        question: "Granulocytes that contain vasoactive amines such as histamine are called:",
        options: ["Neutrophils", "Eosinophils", "Basophils", "Monocytes"],
        answer: 2,
        rationale: "Basophils contain histamine, chemotactic factors, enzymes, and heparin."
      },
      {
        question: "Which blood elements are disk-shaped cytoplasmic fragments essential for clotting?",
        options: ["Monocytes", "Platelets", "Macrophages", "Erythrocytes"],
        answer: 1,
        rationale: "Platelets are cytoplasmic fragments essential for clotting."
      },
      {
        question: "Blood cells that differentiate into macrophages are known as:",
        options: ["Monocytes", "Neutrophils", "Eosinophils", "Basophils"],
        answer: 0,
        rationale: "Only monocytes migrate and become macrophages."
      },
      {
        question: "Without prior exposure to antigen, which cells destroy some tumor and virus-infected cells?",
        options: ["Lymphocytes", "Plasma cells", "Megakaryocytes", "NK cells"],
        answer: 3,
        rationale: "Natural killer cells kill some tumor/virus-infected cells without prior exposure."
      },
      {
        question: "What is the life span of platelets (in days)?",
        options: ["10", "30", "90", "120"],
        answer: 0,
        rationale: "Platelets circulate ~10 days."
      },
      {
        question: "Fetal hematopoiesis occurs in which structure?",
        options: ["Gut", "Spleen", "Bone marrow", "Thymus"],
        answer: 1,
        rationale: "Spleen is the largest secondary hematopoietic organ in fetus."
      },
      {
        question: "What is the consequence of splenectomy?",
        options: ["Increased iron in circulation", "Increased antibody production", "Increased defective cells in circulation", "Increased clotting factors"],
        answer: 2,
        rationale: "Splenectomy results in defective cells remaining in circulation."
      },
      {
        question: "During infection, why do lymph nodes enlarge?",
        options: ["Lymphocytes proliferate", "Nodes inflamed", "Nodes fill with exudate", "Nodes not functioning"],
        answer: 0,
        rationale: "B-lymphocyte proliferation causes lymph node enlargement."
      },
      {
        question: "Which blood cells are the chief phagocytes of early inflammation?",
        options: ["Neutrophils", "Monocytes", "Eosinophils", "Basophils"],
        answer: 0,
        rationale: "Neutrophils are the chief phagocytes of early inflammation."
      },
      {
        question: "Which blood cells are biconcave in shape and deformable?",
        options: ["Neutrophils", "Monocytes", "Eosinophils", "Erythrocytes"],
        answer: 3,
        rationale: "Erythrocytes are biconcave and deformable, aiding gas transport."
      },
      {
        question: "Which hemoglobin is made from oxidized ferric iron (Fe3+) and cannot bind oxygen?",
        options: ["Deoxyhemoglobin", "Oxyhemoglobin", "Methemoglobin", "Glycosylated hemoglobin"],
        answer: 2,
        rationale: "Methemoglobin (Fe3+) cannot bind oxygen."
      },
      {
        question: "Absence of parietal cells would prevent absorption of which nutrient?",
        options: ["Iron deficiency", "Pernicious anemia", "Folic acid deficiency", "Aplastic anemia"],
        answer: 1,
        rationale: "Without parietal cells, intrinsic factor (IF) cannot transport vitamin B12 → pernicious anemia."
      },
      {
        question: "Which nutrients are necessary for DNA synthesis and erythrocyte maturation?",
        options: ["Protein and niacin", "Iron and vitamin B6", "Cobalamin (B12) and folate", "Pantothenic acid and vitamin C"],
        answer: 2,
        rationale: "Cobalamin and folate are essential for DNA synthesis."
      },
      {
        question: "Which nutrients are necessary for hemoglobin synthesis?",
        options: ["Protein and niacin", "Iron and vitamin B6", "Cobalamin (B12) and folate", "Pantothenic acid and vitamin C"],
        answer: 1,
        rationale: "Iron and B6 are essential for hemoglobin synthesis."
      },
      {
        question: "Recycling of iron from erythrocytes is made possible by which?",
        options: ["Transferrin", "Hemosiderin", "Apoferritin", "Erythropoietin"],
        answer: 0,
        rationale: "Transferrin recycles iron by binding and transporting it."
      },
      {
        question: "By which structure are mature erythrocytes removed from the bloodstream?",
        options: ["Liver", "Lymph nodes", "Thymus", "Spleen"],
        answer: 3,
        rationale: "After ~100–120 days, old erythrocytes are removed by macrophages, primarily in the spleen."
      },
      {
        question: "Which substance is used to correct the chronic anemia associated with chronic renal failure?",
        options: ["Iron", "Erythropoietin", "Cobalamin (B12)", "Folate"],
        answer: 1,
        rationale: "Erythropoietin is used in treatment of chronic anemia of renal failure."
      },
      {
        question: "What is the role of thromboxane A2 (TXA2) in hemostasis?",
        options: ["Stimulates protein synthesis", "Promotes vasodilation", "Stimulates platelet aggregation", "Promotes formation of cyclooxygenase"],
        answer: 2,
        rationale: "TXA2 stimulates platelet aggregation and vasoconstriction."
      },
      {
        question: "Which of the following is the role of nitric oxide (NO) in hemostasis?",
        options: ["Stimulates release of fibrinogen", "Stimulates release of clotting factors", "Causes vasoconstriction and platelet aggregation", "Controls platelet activation through cGMP-mediated signaling"],
        answer: 3,
        rationale: "NO controls platelet activation through cyclic GMP signaling."
      },
      {
        question: "The drug heparin acts in hemostasis by which processes?",
        options: ["Inhibiting thrombin and antithrombin III", "Preventing conversion of prothrombin to thrombin", "Shortening fibrin strands", "Degrading fibrin clots"],
        answer: 0,
        rationale: "Heparin enhances antithrombin III activity."
      },
      {
        question: "What is plasmin’s role in the clotting process?",
        options: ["Stimulates platelet aggregation", "Inhibits platelet adhesion", "Prevents conversion of prothrombin", "Degrades fibrin clots"],
        answer: 3,
        rationale: "Plasmin degrades fibrin polymers in clots."
      },
      {
        question: "What does polycythemia at birth indicate?",
        options: ["Hypoxia in utero", "Dysfunctional bone marrow", "Congenitally absent spleen", "Dehydration"],
        answer: 0,
        rationale: "Polycythemia indicates hypoxia in utero."
      },
      {
        question: "Where are Kupffer cells located?",
        options: ["Kidneys", "Liver", "Pancreas", "Spleen"],
        answer: 1,
        rationale: "Kupffer cells are macrophages in the liver."
      },
      {
        question: "Where are Langerhans cells found?",
        options: ["Skin", "Intestinal lining", "Kidney", "Thyroid"],
        answer: 0,
        rationale: "Langerhans cells are found in skin."
      },
      {
        question: "What is the role of collagen in clotting?",
        options: ["Initiates clotting cascade", "Activates platelets", "Stimulates fibrin", "Deactivates fibrinogen"],
        answer: 1,
        rationale: "Collagen provides strong stimulus to activate platelets."
      },
      {
        question: "Which form of iron can be used in hemoglobin?",
        options: ["Fe3+", "Fe2+", "Fe4+", "Fe6+"],
        answer: 1,
        rationale: "Only reduced ferrous iron (Fe2+) can bind oxygen."
      },
      {
        question: "Where are alveolar macrophages found?",
        options: ["Skin", "Breasts", "GI tract", "Lungs"],
        answer: 3,
        rationale: "Alveolar macrophages are found in lungs."
      },
      {
        question: "What changes to the hematologic system are related to aging?",
        options: ["Increased platelet adhesiveness", "Decreased lymphocyte function", "Increased cellular immunity", "Accelerated erythrocyte reproduction"],
        answer: 1,
        rationale: "Lymphocyte function decreases with age."
      },
      {
        question: "What is the function of erythrocytes?",
        options: ["Tissue oxygenation", "Hemostasis", "Infection control", "Allergy response"],
        answer: 0,
        rationale: "Erythrocytes are solely responsible for oxygenation."
      },
      {
        question: "Which characteristics allow erythrocytes to function as gas carriers? (Select all that apply.)",
        options: ["Permanent shape", "Compactness", "Reversible deformability", "Hyperactive mitochondria", "Biconcavity"],
        answer: [2, 4],
        rationale: "Erythrocytes are biconcave and deformable."
      },
      {
        question: "Which statements about plasma proteins are correct? (Select all that apply.)",
        options: ["Provide clotting factors", "Transport triglycerides", "Synthesize complement proteins", "Create hydrostatic pressure", "Transport cholesterol"],
        answer: [0, 1, 2, 4],
        rationale: "Plasma proteins do not create hydrostatic pressure."
      },
      {
        question: "What are the primary anticoagulant mechanisms? (Select all that apply.)",
        options: ["Antithrombin III", "Tissue factor pathway inhibitor", "Hematopoiesis", "Protein C", "Phagocytosis"],
        answer: [0, 1, 3],
        rationale: "Major anticoagulants include antithrombin III, tissue factor inhibitors, protein C."
      },
      {
        question: "Which statements are true regarding the role of endothelium in clot formation? (Select all that apply.)",
        options: ["Produces protease inhibitors", "Plasma proteins assist prevention", "Thrombomodulin converted on endothelial surface", "Protein B binds thrombonium", "Activated protein C enhances adhesion"],
        answer: [0, 1, 2],
        rationale: "Endothelium resists clot formation with protease inhibitors, thrombomodulin, protein C."
      },
      {
        question: "Which statements characterize albumin? (Select all that apply.)",
        options: ["Retains sodium for osmotic balance", "Provides colloid osmotic pressure", "Synthesized in the liver", "Carrier for water-insoluble drugs", "Is a small molecule"],
        answer: [1, 2, 3],
        rationale: "Albumin maintains osmotic pressure, is synthesized in liver, and carries water-insoluble drugs."
      },
      {
        question: "Matching: Endomitosis, Hemostasis, Hematopoiesis, Erythropoiesis, Phagocytosis",
        options: ["Clotting", "Red blood cell development", "Red blood cell destruction", "Platelet formation", "Blood cell production"],
        answer: [3, 0, 4, 1, 2],
        rationale: "39. Endomitosis → Platelet formation; 40. Hemostasis → Clotting; 41. Hematopoiesis → Blood cell production; 42. Erythropoiesis → Red blood cell development; 43. Phagocytosis → Red blood cell destruction."
      }
    ]
  },
  {
    chapter: 29,
    questions: [
      {
        question: "What term is used to describe the capacity of some erythrocytes to vary in size, especially in relationship to some anemias?",
        options: ["Poikilocytosis", "Isocytosis", "Anisocytosis", "Microcytosis"],
        answer: 2,
        rationale: "Additional descriptors of erythrocytes associated with some anemias include anisocytosis (assuming various sizes) and poikilocytosis (assuming various shapes). The remaining terms are not associated with this condition."
      },
      {
        question: "What is the fundamental physiologic manifestation of anemia?",
        options: ["Hypotension", "Hyperesthesia", "Hypoxia", "Ischemia"],
        answer: 2,
        rationale: "The fundamental physiologic manifestation of anemia is a reduced oxygen-carrying capacity of the blood, resulting in tissue hypoxia."
      },
      {
        question: "The paresthesia that occurs with vitamin B12 deficiency anemia is a result of which of the following?",
        options: ["Reduction in acetylcholine receptors in the postsynaptic nerves", "Myelin degeneration in the spinal cord", "Destruction of myelin in peripheral nerves", "Altered function of neurons in the parietal lobe"],
        answer: 1,
        rationale: "Effects on the nervous system can occur if a vitamin B12 deficiency causes the anemia. Myelin degeneration may occur with the resultant loss of fibers in the spinal cord, producing paresthesia (numbness), gait disturbances, spasticity, and reflex abnormalities."
      },
      {
        question: "Which of the following describes how the body compensates for anemia?",
        options: ["Increasing rate and depth of breathing", "Decreasing capillary vasoconstriction", "Hemoglobin holding more firmly onto oxygen", "Kidneys releasing more erythropoietin"],
        answer: 0,
        rationale: "Tissue hypoxia creates additional demands and compensatory actions on the pulmonary and hematologic systems. The rate and depth of breathing increase in an attempt to increase the availability of oxygen."
      },
      {
        question: "Which is the most common type of anemia?",
        options: ["Iron deficiency", "Folate deficiency", "Pernicious", "Hemolytic"],
        answer: 0,
        rationale: "Iron deficiency anemia is the most common type of anemia worldwide."
      },
      {
        question: "Which blood disorder is an X-linked recessive disorder?",
        options: ["Sickle cell disease", "Hemophilia A", "Thalassemia", "Iron deficiency anemia"],
        answer: 1,
        rationale: "Hemophilia A is an X-linked recessive clotting disorder."
      },
      {
        question: "What is the cause of beta-thalassemia major?",
        options: ["Deficiency of factor VIII", "Absence of hemoglobin A", "Defective platelet production", "Deficiency of iron"],
        answer: 1,
        rationale: "Beta-thalassemia major results from absent beta chains, leading to absence of hemoglobin A."
      },
      {
        question: "Which condition is associated with decreased platelet count in children?",
        options: ["Idiopathic thrombocytopenic purpura (ITP)", "Hemophilia A", "Sickle cell disease", "Thalassemia"],
        answer: 0,
        rationale: "ITP is an autoimmune condition leading to destruction of platelets."
      },
      {
        question: "Which clinical manifestation is typical of acute lymphoblastic leukemia (ALL)?",
        options: ["Bone pain and fever", "Severe hemarthrosis", "Petechiae with splenomegaly", "Hematuria"],
        answer: 0,
        rationale: "Children with ALL often present with bone pain, fever, and general malaise."
      },
      {
        question: "Which diagnostic finding is consistent with thalassemia major?",
        options: ["Elevated hemoglobin A", "Absence of hemoglobin A", "Increased serum iron", "Decreased ferritin"],
        answer: 1,
        rationale: "The absence of hemoglobin A is diagnostic of thalassemia major."
      },
      {
        question: "Which condition is the most common of the childhood cancers?",
        options: ["Leukemia", "Lymphoma", "Neuroblastoma", "Sarcoma"],
        answer: 0,
        rationale: "Leukemia is the most common malignancy of childhood, accounting for about 30% of all cancers in children."
      },
      {
        question: "Which type of leukemia is most common in children?",
        options: ["Acute lymphocytic leukemia (ALL)", "Chronic lymphocytic leukemia (CLL)", "Acute myelogenous leukemia (AML)", "Chronic myelogenous leukemia (CML)"],
        answer: 0,
        rationale: "ALL is the most common type of childhood leukemia."
      },
      {
        question: "Which condition results in sickling of red blood cells?",
        options: ["Hemophilia A", "Thalassemia major", "Sickle cell disease", "Iron deficiency anemia"],
        answer: 2,
        rationale: "Sickle cell disease is characterized by the production of abnormal hemoglobin S, which causes red blood cells to sickle under low oxygen conditions."
      },
      {
        question: "Which clinical manifestation is most consistent with hemophilia?",
        options: ["Recurrent infections", "Hemarthrosis", "Severe anemia", "Splenomegaly"],
        answer: 1,
        rationale: "Hemarthrosis (bleeding into the joints) is characteristic of hemophilia."
      },
      {
        question: "Which diagnostic test confirms iron deficiency anemia in children?",
        options: ["Increased hematocrit", "Low serum ferritin", "Elevated reticulocyte count", "Bone marrow biopsy"],
        answer: 1,
        rationale: "Low serum ferritin is diagnostic of iron deficiency anemia."
      },
      {
        question: "Which genetic disorder is characterized by a defect in the production of clotting factor VIII?",
        options: ["Hemophilia A", "Hemophilia B", "Von Willebrand disease", "Thalassemia"],
        answer: 0,
        rationale: "Hemophilia A results from a deficiency in clotting factor VIII."
      },
      {
        question: "Which disorder is characterized by excessive red cell destruction?",
        options: ["Aplastic anemia", "Hemolytic anemia", "Iron deficiency anemia", "Pernicious anemia"],
        answer: 1,
        rationale: "Hemolytic anemia results from premature destruction of red cells."
      },
      {
        question: "Which vitamin deficiency is associated with pernicious anemia?",
        options: ["Vitamin C", "Vitamin K", "Vitamin B12", "Folate"],
        answer: 2,
        rationale: "Pernicious anemia results from a deficiency in vitamin B12."
      },
      {
        question: "Which population is most at risk for iron deficiency anemia?",
        options: ["Middle-aged men", "Children and women", "Athletes", "Postmenopausal women"],
        answer: 1,
        rationale: "Children and women are at highest risk."
      },
      {
        question: "Which condition is associated with abnormal hemoglobin synthesis and ineffective erythropoiesis?",
        options: ["Sickle cell disease", "Iron deficiency anemia", "Thalassemia", "Hemophilia"],
        answer: 2,
        rationale: "Thalassemia involves defective hemoglobin synthesis and ineffective erythropoiesis."
      },
      {
        question: "Which deficiency results in megaloblastic anemia?",
        options: ["Iron", "Vitamin B12 or folate", "Vitamin K", "Protein"],
        answer: 1,
        rationale: "Both vitamin B12 and folate deficiencies impair DNA synthesis, resulting in megaloblastic anemia."
      },
      {
        question: "Which anemia is caused by bone marrow failure?",
        options: ["Iron deficiency anemia", "Hemolytic anemia", "Aplastic anemia", "Pernicious anemia"],
        answer: 2,
        rationale: "Aplastic anemia results from bone marrow failure, leading to pancytopenia."
      },
      {
        question: "Which anemia is characterized by microcytic, hypochromic red cells?",
        options: ["Iron deficiency anemia", "Aplastic anemia", "Pernicious anemia", "Hemolytic anemia"],
        answer: 0,
        rationale: "Iron deficiency anemia produces microcytic, hypochromic red cells."
      },
      {
        question: "Which is the most common inherited bleeding disorder?",
        options: ["Hemophilia A", "Hemophilia B", "Von Willebrand disease", "Factor V deficiency"],
        answer: 2,
        rationale: "Von Willebrand disease is the most common inherited bleeding disorder."
      },
      {
        question: "Which is the most common nutritional disorder in the world?",
        options: ["Vitamin D deficiency", "Protein deficiency", "Iron deficiency anemia", "Folate deficiency"],
        answer: 2,
        rationale: "Iron deficiency anemia is the most common nutritional disorder worldwide."
      },
      {
        question: "Which test is used to diagnose sickle cell disease?",
        options: ["Serum ferritin", "Peripheral smear", "Hemoglobin electrophoresis", "Bone marrow biopsy"],
        answer: 2,
        rationale: "Hemoglobin electrophoresis identifies hemoglobin S in sickle cell disease."
      },
      {
        question: "Which condition is characterized by excessive iron absorption and deposition?",
        options: ["Hemosiderosis", "Hemochromatosis", "Thalassemia", "Sideroblastic anemia"],
        answer: 1,
        rationale: "Hemochromatosis involves excessive absorption of dietary iron and deposition in tissues."
      },
      {
        question: "Which laboratory finding is characteristic of iron deficiency anemia?",
        options: ["Elevated serum ferritin", "Low serum ferritin", "Elevated vitamin B12", "Normal serum iron"],
        answer: 1,
        rationale: "Low serum ferritin is characteristic of iron deficiency anemia."
      },
      {
        question: "Which anemia is associated with a deficiency in folic acid?",
        options: ["Microcytic", "Megaloblastic", "Hemolytic", "Hypochromic"],
        answer: 1,
        rationale: "Folate deficiency produces megaloblastic anemia."
      },
      {
        question: "Which symptom is common in children with iron deficiency anemia?",
        options: ["Pica", "Hemarthrosis", "Petechiae", "Hematuria"],
        answer: 0,
        rationale: "Children with iron deficiency anemia often develop pica (craving non-food substances)."
      },
      {
        question: "Which conditions are inherited as autosomal recessive disorders? (Select all that apply.)",
        options: ["Sickle cell disease", "Thalassemia", "Hemophilia A", "Iron deficiency anemia", "Idiopathic thrombocytopenic purpura (ITP)"],
        answer: [0, 1],
        rationale: "Both sickle cell disease and thalassemia are inherited as autosomal recessive disorders."
      },
      {
        question: "Which are clinical manifestations of sickle cell disease? (Select all that apply.)",
        options: ["Vaso-occlusive crisis", "Sequestration crisis", "Aplastic crisis", "Hyperhemolytic crisis", "Hemarthrosis"],
        answer: [0, 1, 2, 3],
        rationale: "Sickle cell disease presents with vaso-occlusive, sequestration, aplastic, and hyperhemolytic crises. Hemarthrosis is characteristic of hemophilia, not sickle cell disease."
      },
      {
        question: "Which laboratory findings are associated with pernicious anemia? (Select all that apply.)",
        options: ["Decreased vitamin B12", "Enlarged red blood cells (MCV high)", "Low serum ferritin", "Low reticulocyte count", "Hypersegmented neutrophils"],
        answer: [0, 1, 3, 4],
        rationale: "Vitamin B12 deficiency produces macrocytosis, hypersegmented neutrophils, and low reticulocyte counts. Serum ferritin is decreased only in iron deficiency anemia."
      },
      {
        question: "Which conditions may present with thrombocytopenia? (Select all that apply.)",
        options: ["Idiopathic thrombocytopenic purpura (ITP)", "Leukemia", "Aplastic anemia", "Disseminated intravascular coagulation (DIC)", "Hemophilia A"],
        answer: [0, 1, 2, 3],
        rationale: "All listed except hemophilia A (which is a clotting factor deficiency)."
      },
      {
        question: "Matching: Match the anemia with its cause: Iron deficiency anemia, Pernicious anemia, Aplastic anemia, Hemolytic anemia, Sickle cell anemia",
        options: ["Caused by vitamin B12 deficiency", "Caused by impaired hemoglobin synthesis due to lack of iron", "Caused by bone marrow failure", "Caused by abnormal hemoglobin S", "Caused by premature destruction of red blood cells"],
        answer: [1, 0, 2, 4, 3],
        rationale: "35. Caused by vitamin B12 deficiency → Pernicious anemia; 36. Caused by impaired hemoglobin synthesis due to lack of iron → Iron deficiency anemia; 37. Caused by bone marrow failure → Aplastic anemia; 38. Caused by abnormal hemoglobin S → Sickle cell anemia; 39. Caused by premature destruction of red blood cells → Hemolytic anemia."
      }
    ]
  },
  {
    chapter: 30,
    questions: [
      {
        question: "What change is observed in leukocytes during an allergic disorder (type I hypersensitivity) often caused by asthma, hay fever, and drug reactions?",
        options: ["Neutrophilia", "Basophilia", "Eosinophilia", "Monocytosis"],
        answer: 2,
        rationale: "Eosinophilia is an absolute increase (more than 450/μL) in the total numbers of circulating eosinophils. Allergic disorders (type I hypersensitivity associated with asthma, hay fever, and drug reactions, as well as parasitic infections, particularly with metazoal parasites), are often cited as causes. This change is not identified by any of other options."
      },
      {
        question: "In infectious mononucleosis (IM), what does the Monospot test detect?",
        options: ["Immunoglobulin E (IgE)", "Immunoglobulin M (IgM)", "Immunoglobulin G (IgG)", "Immunoglobulin A (IgA)"],
        answer: 1,
        rationale: "Heterophile antibodies are a heterogeneous group of IgM antibodies that are agglutinins against nonhuman red blood cells (e.g., sheep, horse) and are detected by qualitative (monospot) or quantitative (heterophile antibody) test methods. This statement is not true of the other options."
      },
      {
        question: "Which description is consistent with acute lymphocytic leukemia (ALL)?",
        options: ["ALL is a progressive neoplasm defined by the presence of greater than 30% lymphoblasts in the bone marrow or blood.", "Leukocytosis and a predominance of blast cells characterize the bone marrow and peripheral blood. As the immature blasts increase, they replace normal myelocytic cells, erythrocytes, and megakaryocytes.", "B cells fail to mature into plasma cells that synthesize immunoglobulins.", "The translocation of genetic material from genes 9 and 22 creates an abnormal, fused gene identified as BCR-ABL."],
        answer: 0,
        rationale: "ALL is a progressive neoplasm defined by the presence of greater than 30% lymphoblasts in the bone marrow or blood. None of the other options provide an accurate description of ALL."
      },
      {
        question: "Which description is consistent with chronic myelogenous leukemia (CML)?",
        options: ["Defects exist in the ras oncogene, TP53 tumor-suppressor gene, and INK4A the gene encoding a cell-cycle regulatory protein.", "Leukocytosis and a predominance of blast cells characterize the bone marrow and peripheral blood. As the immature blasts increase, they replace normal myelocytic cells, erythrocytes, and megakaryocytes.", "B cells fail to mature into plasma cells that synthesize immunoglobulins.", "The translocation of genetic material from genes 9 and 22 creates an abnormal, fused gene identified as BCR-ABL."],
        answer: 3,
        rationale: "The Philadelphia chromosome is present in more than 95% of those with CML, and the presence of the BCR-ABL1 protein is responsible for the initiation of CML. The other options do not accurately describe CML."
      },
      {
        question: "Which description is consistent with chronic lymphocytic leukemia (CLL)?",
        options: ["Defects exist in the ras oncogene, TP53 tumor-suppressor gene, and INK4A the gene encoding a cell-cycle regulatory protein.", "Leukocytosis and a predominance of blast cells characterize the bone marrow and peripheral blood. As the immature blasts increase, they replace normal myelocytic cells, erythrocytes, and megakaryocytes.", "B cells fail to mature into plasma cells that synthesize immunoglobulins.", "The translocation of genetic material from genes 9 and 22 creates an abnormal, fused gene identified as BCR-ABL."],
        answer: 2,
        rationale: "CLL is derived from transformation of a partially mature B cell that has not yet encountered antigen. The other options do not accurately describe CLL."
      },
      {
        question: "Which electrolyte imbalance accompanies multiple myeloma (MM)?",
        options: ["Hyperkalemia", "Hypercalcemia", "Hyperphosphatemia", "Hypernatremia"],
        answer: 1,
        rationale: "Elevated levels of calcium in the blood (hypercalcemia) characterize the common presentation of MM. The other options do not accompany MM."
      },
      {
        question: "Reed-Sternberg (RS) cells represent malignant transformation and proliferation of which of the following?",
        options: ["Interleukin (IL)-1, IL-2, IL-5, and IL-6", "Tumor necrosis factor–beta", "B cells", "T cells"],
        answer: 2,
        rationale: "Although the molecular events that cause malignant transformation remain controversial, RS cells are generally of B-cell lineage. Other options are not relevant to this process."
      },
      {
        question: "Local signs and symptoms of Hodgkin disease–related lymphadenopathy are a result of which of the following?",
        options: ["Pressure and ischemia", "Pressure and obstruction", "Inflammation and ischemia", "Inflammation and pressure"],
        answer: 1,
        rationale: "Local symptoms caused by pressure and obstruction of the lymph nodes are the result of lymphadenopathy. The other options do not contribute to the lymphadenopathy associated with Hodgkin disease."
      },
      {
        question: "Which virus is associated with Burkitt lymphoma in African children?",
        options: ["Cytomegalovirus", "Adenovirus", "Human papillomavirus", "Epstein-Barr virus"],
        answer: 3,
        rationale: "Epstein-Barr virus, found in nasopharyngeal secretions, is associated with Burkitt lymphoma in African children. The other options are not associated with this malignancy."
      },
      {
        question: "Which term is used to describe a red–purple discoloration caused by diffuse hemorrhage into the skin tissues?",
        options: ["Petechiae", "Hematoma", "Ecchymosis", "Purpura"],
        answer: 3,
        rationale: "Diffuse hemorrhage into skin tissues that is visible through the skin causes a red–purple discoloration identified as a purpura. None of the other options are used to identify this symptom."
      },
      {
        question: "Which statement best describes heparin-induced thrombocytopenia (HIT)?",
        options: ["Immunoglobulin G immune-mediated adverse drug reaction that reduces circulating platelets", "Hematologic reaction to heparin in which the bone marrow is unable to produce sufficient platelets to meet the body’s needs", "Immunoglobulin E–mediated allergic drug reaction that reduces circulating platelets", "Cell-mediated drug reaction in which macrophages process the heparin and present antigen on class II MHC then destroyed by activated cytotoxic T cells"],
        answer: 0,
        rationale: "Heparin is a common cause of drug-induced thrombocytopenia. HIT is an immune-mediated, adverse drug reaction caused by immunoglobulin G antibodies that leads to increased platelet consumption and a decrease in platelet count. None of the other options accurately describe HIT."
      },
      {
        question: "Immune thrombocytopenia (ITP) is a(n) ____ condition in adults and a(n) ____ condition in children.",
        options: ["Acute; acute", "Chronic; chronic", "Acute; chronic", "Chronic; acute"],
        answer: 3,
        rationale: "ITP may be acute or chronic. The acute form is frequently observed in children. Chronic ITP is more common only observed in adults, with the highest prevalence in women between 20 and 40 years of age."
      },
      {
        question: "Vitamin ____ is required for normal clotting factor synthesis by the ____.",
        options: ["K; kidneys", "D; kidneys", "K; liver", "D; liver"],
        answer: 2,
        rationale: "Vitamin K, a fat-soluble vitamin, is necessary for the synthesis and regulation of prothrombin, procoagulant factors (VII, IX, X), and anticoagulant regulators (proteins C and S) in the liver."
      },
      {
        question: "What is the most common cause of vitamin K deficiency?",
        options: ["Administration of warfarin (Coumadin)", "Total parenteral nutrition with antibiotic therapy", "Autoimmune IgE-mediated destruction of vitamin K–dependent disorder", "Liver failure"],
        answer: 1,
        rationale: "The most common cause of vitamin K deficiency is parenteral nutrition in combination with broad-spectrum antibiotics that destroy normal gut flora. None of the other options are commonly associated with vitamin K deficiency."
      },
      {
        question: "Which disorder is described as an unregulated release of thrombin with subsequent fibrin formation and accelerated fibrinolysis?",
        options: ["Disseminated intravascular coagulation (DIC)", "Immune thrombocytopenic purpura (ITP)", "Heparin-induced thrombocytopenia (HIT)", "Essential thrombocythemia (ET)"],
        answer: 0,
        rationale: "DIC is an acquired clinical syndrome characterized by widespread activation of coagulation resulting in the formation of fibrin clots in medium and small vessels throughout the body. This description does not accurately identify any of the other options."
      },
      {
        question: "In disseminated intravascular coagulation (DIC), what activates the coagulation cascade?",
        options: ["Cytokines, such as platelet activating factor (PAF), and tumor necrosis factor–alpha (TNF-α)", "Thrombin formation, causing platelets to aggregate and consume clotting factors", "Tissue factor (TF) located in the endothelial layer of blood vessels and subendothelial tissue", "Endotoxins from gram-negative and gram-positive bacteria circulating in the bloodstream"],
        answer: 2,
        rationale: "Direct tissue damage (ischemia and necrosis, surgical manipulation, crushing injury) causes the endothelium to release TF. The common pathway for DIC appears to be excessive and widespread exposure of TF. The other options are not responsible for the activation of the coagulation cascade."
      },
      {
        question: "Which proinflammatory cytokines are responsible for the development and maintenance of disseminated intravascular coagulation (DIC)?",
        options: ["Granulocyte colony-stimulating factor (G-CSF), interleukin (IL)-2, IL-4, and IL-10, and tumor necrosis factor–gamma (IFN-γ)", "Granulocyte-macrophage colony-stimulating factor (GM-CSF), and IL-3, IL-5, IL-9, and IFN-γ", "Macrophage colony-stimulating factor (M-CSF), IL-7, IL-11, and IL-14, and PAF", "Tumor necrosis factor–alpha (TNF-α); IL-1, IL-6, and IL-8; and platelet-activating factor (PAF)"],
        answer: 3,
        rationale: "Endotoxin, in particular, triggers the release of multiple cytokines that play a significant role in the development and maintenance of DIC. Proinflammatory cytokines—TNF-α, IL-1, IL-6, IL-8, PAF—are responsible for the clinical signs and symptoms associated with the sepsis associated with DIC. None of the other options perform this function."
      },
      {
        question: "In disseminated intravascular coagulation (DIC), what are the indications of microvascular thrombosis?",
        options: ["Reduced amplitude in peripheral pulses", "Symmetric cyanosis of fingers and toes", "Numbness and tingling in fingers and toes", "Bilateral edema of fingers and toes"],
        answer: 1,
        rationale: "Several organ systems are susceptible to microvascular thrombosis that affects their function. Indicators of systemic effects of microvascular failure include altered level of consciousness, seizures, and mental confusion; seizure activity, oliguria, hematuria, hypoxia; hypotension, hemiparesis, chest pain, and tachycardia. Symmetric cyanosis of the fingers and toes (i.e., “blue finger/toe syndrome”) and in some instances, of the nose and ears may be present. The other options are not recognized indicators of microvascular thrombosis."
      },
      {
        question: "What is the most reliable and specific test for diagnosing disseminated intravascular coagulation (DIC)?",
        options: ["Prothrombin time (PT)", "Activated partial thromboplastin time (aPTT)", "Fibrin degradation products (FDP)", "D-dimer"],
        answer: 3,
        rationale: "D-dimer testing measures a specific DIC-related product. This statement is not true of the other options."
      },
      {
        question: "What term is used to identify thrombi that occlude arterioles and capillaries and are made up of platelets with minimal fibrin and erythrocytes?",
        options: ["Essential (primary) thrombocythemia (ET)", "Acute idiopathic thrombotic thrombocytopenia purpura (TTP)", "Thrombotic thrombocytopenic purpura (TTP)", "Immune thrombocytopenic purpura (ITP)"],
        answer: 2,
        rationale: "Of the available options, only TTP is characterized by thrombotic microangiopathy in which platelet aggregates and cause occlusion of arterioles and capillaries in the microcirculation."
      },
      {
        question: "Which of the following is characterized by what is referred to as pathognomonic pentad of symptoms?",
        options: ["Acute idiopathic thrombotic thrombocytopenic purpura", "Essential (primary) thrombocythemia (ET)", "Immune thrombocytopenic purpura (ITP)", "Thrombotic thrombocytopenic purpura (TTP)"],
        answer: 0,
        rationale: "Acute idiopathic thrombotic thrombocytopenic purpura is characterized by a pathognomonic pentad of symptoms that includes extreme thrombocytopenia (fewer than 20,000 platelets/mm³), intravascular hemolytic anemia, ischemic signs and symptoms most often involving the central nervous system (present in nearly 65% of cases with memory disturbances, behavioral irregularities, headache, or coma), kidney failure (affecting approximately 65% of individuals), and fever (present in approximately 33% of individuals). The other options do not demonstrate these symptoms."
      },
      {
        question: "Which statement relates to immune thrombocytopenic purpura (ITP)?",
        options: ["ITP is formed in conditions of low flow and is made up of mostly red cells with larger amounts of fibrin and few platelets.", "An alteration of multipotent stem cells, resulting in an excess production of platelets, causes ITP.", "Mononuclear phagocytes in the spleen remove antibody-coated platelets from circulation.", "Arterial clots are made up of mostly platelet aggregates held together by fibrin strands."],
        answer: 2,
        rationale: "ITP involves the antigen usually forming immune complexes with circulating antibodies, and it is thought that the immune complexes bind to Fc receptors on platelets, leading to their destruction in the spleen. None of the other options are accurately related to ITP."
      },
      {
        question: "When the demand for mature neutrophils exceeds the supply, immature neutrophils are released indicating",
        options: ["A shift to the right", "A shift to the left", "Leukocytosis", "Leukemia"],
        answer: 1,
        rationale: "When the demand for circulating mature neutrophils exceeds the supply, the marrow begins to release immature neutrophils (and other leukocytes) into the blood. Premature release of the immature white cells is responsible for the phenomenon known as a shift to the left or leukemoid reaction. None of the remaining options would be used to identify the process described."
      },
      {
        question: "Hodgkin disease is characterized by the presence of which of the following?",
        options: ["Philadelphia chromosome", "Virchow triad", "Microvascular thrombi", "Reed-Sternberg (RS) cells"],
        answer: 3,
        rationale: "Hodgkin disease is characterized by its progression from one group of lymph nodes to another, the development of systemic symptoms, and the presence of RS cells (see Figure 29-9), but not the involvement of the Philadelphia chromosome. Virchow triad is a symptom related to thrombus formation. Disseminated intravascular coagulation is associated with microvascular thrombi."
      },
      {
        question: "Which classic clinical manifestations are symptoms of IM? (Select all that apply.)",
        options: ["Lymph node enlargement", "Hepatitis", "Pharyngitis", "Edema in the area of the eyes", "Fever"],
        answer: [0, 2, 4],
        rationale: "At the time of diagnosis, the individual usually has the classic triad of symptoms: fever, pharyngitis, and lymphadenopathy of the cervical lymph nodes. This triad does not include hepatitis or orbital edema."
      },
      {
        question: "Early detection of acute leukemia would include which of the following symptoms? (Select all that apply.)",
        options: ["Dizziness", "Paresthesia", "Anorexia", "Bruising", "Bone pain"],
        answer: [2, 3, 4],
        rationale: "Signs and symptoms related to bone marrow depression include fatigue caused by anemia, bleeding resulting from thrombocytopenia (reduced numbers of circulating platelets), and fever caused by infection. Anorexia can occur in all varieties of acute leukemia and is associated with weight loss. Pain in the bones and joints thought to result from leukemia infiltration with secondary stretching of the periosteum. The other options are not generally associated with acute leukemia."
      },
      {
        question: "What are the most significant risk factors for the development of thrombus formation as referred to by the Virchow triad? (Select all that apply.)",
        options: ["Endothelial injury to blood vessels", "Turbulent arterial blood flow", "Rapid coagulation of the blood", "Stagnant venous blood flow", "History of obesity"],
        answer: [0, 1, 3],
        rationale: "The triad for developing spontaneous thrombi is related to several factors, referred to as the Virchow triad: (1) injury to the blood vessel endothelium, (2) abnormalities of blood flow, and (3) hypercoagulability of the blood. Obesity is not associated with the triad."
      },
      {
        question: "Which statements are true regarding leukemias? (Select all that apply.)",
        options: ["A single progenitor cell undergoes a malignant change.", "Leukemia is a result of uncontrolled cellular proliferation.", "Bone marrow becomes overcrowded.", "Leukocytes are under produced.", "Hematopoietic cell production is decreased."],
        answer: [0, 1, 2, 4],
        rationale: "In the leukemias, a single progenitor cell undergoes malignant transformation. The common feature of all forms of leukemia is an uncontrolled proliferation of malignant leukocytes, causing an overcrowding of bone marrow and decreased production and function of normal hematopoietic cells."
      },
      {
        question: "The two major forms of leukemia, acute and chronic, are classified by which criteria? (Select all that apply.)",
        options: ["Predominant cell type", "Rate of progression", "Age of individual when cell differentiation occurs", "Stage of cell development when malignancy first occurs", "Serum level of leukocytes"],
        answer: [0, 1],
        rationale: "The current classification of leukemia is based on (1) the predominant cell of origin (either myeloid or lymphoid) and (2) the rate of progression, which usually reflects the degree to which cell differentiation was arrested when the cell became malignant (acute or chronic). The remaining options are inaccurate statements regarding the classification criteria."
      },
      {
        question: "What are the clinical manifestations of advanced non-African Burkitt lymphoma? (Select all that apply.)",
        options: ["Abdominal swelling", "Night sweats", "Fever", "Weight gain", "Dementia"],
        answer: [0, 1, 2],
        rationale: "In non-African Burkitt lymphoma, the most common presentation is abdominal swelling. More advanced disease may exhibit night sweats, fever, and weight loss. Dementia is not associated with this disease."
      },
      {
        question: "Match the causes or diagnostic tests with the hematologic disorders.\nA. Epstein-Barr Virus\nB. Bence Jones protein\nC. Diagnosed by the Reed-Sternberg cell\nD. Diagnosed by the Philadelphia chromosome\nInfectious mononucleosis → ANS: A\nChronic myelogenous leukemia → ANS: D\nMultiple myeloma → ANS: B\nHodgkin lymphoma → ANS: C",
        options: ["Epstein-Barr Virus", "Bence Jones protein", "Diagnosed by the Reed-Sternberg cell", "Diagnosed by the Philadelphia chromosome"],
        answer: [0, 3, 1, 2],
        rationale: "Infectious mononucleosis → Epstein-Barr Virus; Chronic myelogenous leukemia → Diagnosed by the Philadelphia chromosome; Multiple myeloma → Bence Jones protein; Hodgkin lymphoma → Diagnosed by the Reed-Sternberg cell."
      }
    ]
  },
  {
  chapter: 32,
  questions: [
      {
        question: "Which statement does not accurately describe the pericardium?",
        options: ["The pericardium is a double-walled membranous sac that encloses the heart.", "It is made up of connective tissue and a surface layer of squamous cells.", "The pericardium protects the heart against infection and inflammation from the lungs and pleural space.", "It contains pain and mechanoreceptors that can elicit reflex changes in blood pressure and heart rate."],
        answer: 1,
        rationale: "The pericardium is made up of a surface layer of mesothelium over a thin layer of connective tissue. The remaining options accurately describe the pericardium."
      },
      {
        question: "Which cardiac chamber has the thinnest wall and why?",
        options: ["The right and left atria; they are low-pressure chambers that serve as storage units and conduits for blood", "The right and left atria; they are not directly involved in the preload, contractility, or afterload of the heart", "The left ventricle; the mean pressure of blood coming into this ventricle is from the lungs which has a low pressure", "The right ventricle; it pumps blood directly into the pulmonary capillaries, which have a lower pressure compared with the systemic circulation"],
        answer: 0,
        rationale: "The two atria have the thinnest walls because they are low-pressure chambers that serve as storage units and conduits for blood that is emptied into the ventricles."
      },
      {
        question: "Which chamber of the heart endures the highest pressures?",
        options: ["Right atrium", "Left atrium", "Left ventricle", "Right ventricle"],
        answer: 2,
        rationale: "Pressure is greatest in the systemic circulation, driven by the left ventricle."
      },
      {
        question: "What is the process that ensures mitral and tricuspid valve closure after the ventricles are filled with blood?",
        options: ["Chordae tendineae relax, which allows the valves to close.", "Increased pressure in the ventricles pushes the valves closed.", "Trabeculae carneae contract, which pulls the valves closed.", "Reduced pressure in the atria creates a negative pressure that pulls the valves closed."],
        answer: 1,
        rationale: "With increasing ventricular pressure, these valves close and prevent backflow into the atria as the ventricles contract."
      },
      {
        question: "Regarding the heart’s valves, what is a function of the papillary muscles?",
        options: ["The papillary muscles close the semilunar valves.", "These muscles prevent backward expulsion of the atrioventricular valve.", "They close the atrioventricular valve.", "The papillary muscles open the semilunar valve."],
        answer: 1,
        rationale: "The papillary muscles are extensions of the myocardium that pull the cusps together and downward at the onset of ventricular contraction, thus preventing their backward expulsion into the atria."
      },
      {
        question: "During the cardiac cycle, why do the aortic and pulmonic valves close after the ventricles relax?",
        options: ["Papillary muscles relax, which allows the valves to close.", "Chordae tendineae contract, which pulls the valves closed.", "Reduced pressure in the ventricles creates a negative pressure, which pulls the valves closed.", "Blood fills the cusps of the valves and causes the edges to merge, closing the valves."],
        answer: 3,
        rationale: "When the ventricles relax, blood fills the cusps and causes their free edges to meet in the middle of the vessel, closing the valve and preventing any backflow."
      },
      {
        question: "Oxygenated blood flows through which vessels?",
        options: ["Superior vena cava", "Pulmonary veins", "Pulmonary artery", "Coronary veins"],
        answer: 1,
        rationale: "Only the four pulmonary veins, two from the right lung and two from the left lung, carry oxygenated blood from the lungs to the left side of the heart."
      },
      {
        question: "The significance of the atrial kick is that it affects the contraction of the:",
        options: ["Right atria, which is necessary to open the tricuspid valve.", "Right atria, which is necessary to increase the blood volume from the vena cava.", "Left atria, which increases the blood volume into the ventricle.", "Left atria, that is necessary to open the mitral valve."],
        answer: 2,
        rationale: "Left atrial contraction, the atrial kick, provides a significant increase of blood to the left ventricle."
      },
      {
        question: "Occlusion of the left anterior descending artery during a myocardial infarction would interrupt blood supply to which structures?",
        options: ["Left and right ventricles and much of the interventricular septum", "Left atrium and the lateral wall of the left ventricle", "Upper right ventricle, right marginal branch, and right ventricle to the apex", "Posterior interventricular sulcus and the smaller branches of both ventricles"],
        answer: 0,
        rationale: "The left anterior descending artery (LAD), also called the anterior interventricular artery, delivers blood to portions of the left and right ventricles and much of the interventricular septum."
      },
      {
        question: "Occlusion of the circumflex artery during a myocardial infarction would interrupt blood supply to which area?",
        options: ["Left and right ventricles and much of the interventricular septum", "Posterior interventricular sulcus and the smaller branches of both ventricles", "Upper right ventricle, right marginal branch, and right ventricle to the apex", "Left atrium and the lateral wall of the left ventricle"],
        answer: 3,
        rationale: "The circumflex artery supplies blood to the left atrium and the lateral wall of the left ventricle."
      },
      {
        question: "The coronary ostia are located in the:",
        options: ["Left ventricle", "Aortic valve", "Coronary sinus", "Aorta"],
        answer: 3,
        rationale: "Coronary arteries receive blood through openings in the aorta, called the coronary ostia."
      },
      {
        question: "The coronary sinus empties into which cardiac structure?",
        options: ["Right atrium", "Left atrium", "Superior vena cava", "Aorta"],
        answer: 0,
        rationale: "The cardiac veins empty only into the right atrium through another ostium, the opening of a large vein called the coronary sinus."
      },
      {
        question: "What is the ratio of coronary capillaries to cardiac muscle cells?",
        options: ["1:1 (one capillary per one muscle cell)", "1:2 (one capillary per two muscle cells)", "1:4 (one capillary per four muscle cells)", "1:10 (one capillary per ten muscle cells)"],
        answer: 0,
        rationale: "The heart has an extensive capillary network, with approximately 3300 capillaries per square millimeter (cm²/mm²) or approximately one capillary per one muscle cell (muscle fiber)."
      },
      {
        question: "During the cardiac cycle, which structure directly delivers action potential to the ventricular myocardium?",
        options: ["Sinoatrial (SA) node", "Atrioventricular (AV) node", "Purkinje fibers", "Bundle branches"],
        answer: 2,
        rationale: "Each cardiac action potential travels from the SA node to the AV node to the bundle of His (AV bundle), through the bundle branches, and finally to the Purkinje fibers and the ventricular myocardium, where the impulse is stopped."
      },
      {
        question: "What causes depolarization of a cardiac muscle cell to occur?",
        options: ["Decrease in the permeability of the cell membrane to potassium", "Rapid movement of sodium into the cell", "Decrease in the movement of sodium out of the cell", "Rapid movement of calcium out of the cell"],
        answer: 1,
        rationale: "Phase 0 consists of depolarization, which lasts 1 to 2 milliseconds (ms) and represents rapid sodium entry into the cell."
      },
      {
        question: "Which event occurs during phase 1 of the normal myocardial cell depolarization and repolarization?",
        options: ["Repolarization when potassium moves out of the cells", "Repolarization when sodium rapidly enters the cells", "Early repolarization when sodium slowly enters the cells", "Early repolarization when calcium slowly enters the cells"],
        answer: 3,
        rationale: "Phase 1 is early repolarization and the only time during which calcium slowly enters the cell."
      },
      {
        question: "Which phase of the normal myocardial cell depolarization and repolarization correlates with diastole?",
        options: ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
        answer: 3,
        rationale: "Potassium is moved out of the cell during phase 3, with a return to resting membrane potential only in phase 4. The time between action potentials corresponds to diastole."
      },
      {
        question: "In the normal electrocardiogram, what does the PR interval represent?",
        options: ["Atrial depolarization", "Ventricular depolarization", "Atrial activation to onset of ventricular activity", "Electrical systole of the ventricles"],
        answer: 2,
        rationale: "The PR interval is a measure of time from the onset of atrial activation to the onset of ventricular activation; it normally ranges from 0.12 to 0.20 second."
      },
      {
        question: "The cardiac electrical impulse normally begins spontaneously in the sinoatrial (SA) node because it:",
        options: ["Has a superior location in the right atrium", "Is the only area of the heart capable of spontaneous depolarization", "Has rich sympathetic innervation via the vagus nerve", "Depolarizes more rapidly than other automatic cells of the heart"],
        answer: 3,
        rationale: "The electrical impulses normally begin in the SA node because its cells depolarize more rapidly than other automatic cells."
      },
      {
        question: "What period follows depolarization of the myocardium, and represents a period during which no new cardiac potential can be propagated?",
        options: ["Refractory", "Hypopolarization", "Threshold", "Sinoatrial (SA)"],
        answer: 0,
        rationale: "During the refractory period, no new cardiac action potential can be initiated by a stimulus."
      },
      {
        question: "Which complex (wave) represents the sum of all ventricular muscle cell depolarizations?",
        options: ["P", "QRS", "QT interval", "T"],
        answer: 1,
        rationale: "Only the QRS complex represents the sum of all ventricular muscle cell depolarizations."
      },
      {
        question: "What can shorten the conduction time of action potential through the atrioventricular (AV) node?",
        options: ["Parasympathetic nervous system", "Catecholamines", "Vagal stimulation", "Sinoatrial node (SA)"],
        answer: 1,
        rationale: "Catecholamines increase speed of heart rate, shorten the conduction time through the AV node, and increase the rhythmic discharge of pacemaker fibers."
      },
      {
        question: "If the sinoatrial (SA) node fails, then at what rate (depolarizations per minute) can the atrioventricular (AV) node depolarize?",
        options: ["60 to 70", "40 to 60", "30 to 40", "10 to 20"],
        answer: 1,
        rationale: "If the SA node is damaged, then the AV node will become the heart’s pacemaker at a rate of approximately 40 to 60 spontaneous depolarizations per minute."
      },
      {
        question: "What is the effect of epinephrine on β₂ receptors on the heart?",
        options: ["Decreases coronary blood flow", "Suppresses the effects of both β₁ and β₂ receptors", "Increases the strength of myocardial contraction", "Prevents overestimulation of the heart by the sympathetic nervous system"],
        answer: 3,
        rationale: "β₂ receptors may provide a safety mechanism that decreases myocardial contractility to prevent overstimulation of the heart by the sympathetic nervous system."
      },
      {
        question: "Where in the heart are the receptors for neurotransmitters located?",
        options: ["Semilunar and atrioventricular (AV) valves", "Endocardium and sinoatrial (SA) node", "Myocardium and coronary vessels", "Epicardium and AV node"],
        answer: 2,
        rationale: "Sympathetic neural stimulation of the myocardium and coronary vessels depends on the presence of adrenergic receptors, which specifically bind with neurotransmitters of the sympathetic nervous system."
      },
      {
        question: "What enables electrical impulses to travel in a continuous cell-to-cell fashion in myocardial cells?",
        options: ["Sarcolemma mesotolic plaques", "Intercalated disks", "Trabeculae carneae", "Bachmann bundles"],
        answer: 1,
        rationale: "Only intercalated disks, thickened portions of the sarcolemma, enable electrical impulses to spread quickly in a continuous cell-to-cell (syncytial) fashion."
      },
      {
        question: "Within a physiologic range, what does an increase in left ventricular end-diastolic volume (preload) result in?",
        options: ["Increase in force of contraction", "Decrease in refractory time", "Increase in afterload", "Decrease in repolarization"],
        answer: 0,
        rationale: "This concept is expressed in the Frank-Starling law; the cardiac muscle, like other muscles, increases its strength of contraction when it is stretched."
      },
      {
        question: "What is the effect of epinephrine on β₁ receptors of the heart?",
        options: ["Decreases myocardial contractility", "Increases myocardial contractility", "Decreases the heart rate", "Blocks potassium channels"],
        answer: 1,
        rationale: "β₁ receptors, when stimulated by epinephrine, increase myocardial contractility and heart rate."
      },
      {
        question: "What is the effect of acetylcholine on the heart?",
        options: ["Increased calcium influx", "Decreased myocardial contractility", "Increased heart rate", "Increased conduction through AV node"],
        answer: 1,
        rationale: "Acetylcholine, released from parasympathetic fibers, slows the heart rate and decreases myocardial contractility by decreasing calcium influx."
      },
      {
        question: "Which factors determine cardiac output?",
        options: ["Heart rate and stroke volume", "Preload and afterload", "Contractility and ejection fraction", "Blood volume and vascular resistance"],
        answer: 0,
        rationale: "Cardiac output is the volume of blood flowing through either the systemic or pulmonary circuit per minute and is determined by heart rate and stroke volume."
      },
      {
        question: "Which cardiovascular function is the most significant of the baroreceptor reflex?",
        options: ["Changes in heart rate", "Regulation of blood volume", "Regulation of myocardial contractility", "Prevention of hyperkalemia"],
        answer: 0,
        rationale: "The baroreceptor reflex quickly responds to changes in blood pressure by altering heart rate."
      },
      {
        question: "Which peptide is released from atrial tissue and causes vasodilation and sodium excretion?",
        options: ["Angiotensin II", "Bradykinin", "Atrial natriuretic peptide (ANP)", "Endothelin"],
        answer: 2,
        rationale: "Atrial natriuretic peptide is secreted from atrial tissue in response to increased volume and promotes vasodilation and sodium excretion."
      },
      {
        question: "What effect does nitric oxide (NO) have on systemic arterioles?",
        options: ["Vasoconstriction", "Vasodilation", "Sodium retention", "Increased afterload"],
        answer: 1,
        rationale: "Endothelium-derived nitric oxide is a potent vasodilator."
      },
      {
        question: "Which substance primarily controls blood flow by causing vasoconstriction or vasodilation in coronary vessels?",
        options: ["Serotonin", "Nitric oxide", "Adenosine", "Acetylcholine"],
        answer: 2,
        rationale: "Adenosine is the most important local vasodilator in coronary circulation."
      }
      ,
      {
        question: "What is the most important negative inotropic agent?",
        options: ["Norepinephrine", "Epinephrine", "Acetylcholine", "Dopamine"],
        answer: 2,
        rationale: "Chemicals affecting contractility are called inotropic agents. The most important negative inotropic agent is acetylcholine released from the vagus nerve. The most important positive inotropic agents produced by the body are norepinephrine released from the sympathetic nerves that supply the heart and epinephrine released by the adrenal cortex. Other positive inotropes include thyroid hormone and dopamine. Many medications may have positive or negative inotropic properties that can have profound effects on cardiac function. This selection is the only option that accurately identifies the regulation that is involved in the described process."
      },
      {
        question: "The right lymphatic duct drains into which structure?",
        options: ["Right subclavian artery", "Right atrium", "Right subclavian vein", "Superior vena cava"],
        answer: 2,
        rationale: "The right lymphatic duct drains lymph fluid from the right thorax, arm, and head into the right subclavian vein."
      },
      {
        question: "Where is the major cardiovascular center in the central nervous system?",
        options: ["Frontal lobe", "Thalamus", "Brainstem", "Hypothalamus"],
        answer: 2,
        rationale: "The major cardiovascular control center is in the brainstem in the medulla with secondary areas in the hypothalamus, the cerebral cortex, the thalamus, and the complex networks of excitatory or inhibitory interneurons (connecting neurons) throughout the brain. This selection is the only option that correctly identifies the cardiovascular control center."
      },
      {
        question: "What is an expected change in the cardiovascular system that occurs with aging?",
        options: ["Arterial stiffening", "Decreased left ventricular wall tension", "Decreased aortic wall thickness", "Arteriosclerosis"],
        answer: 0,
        rationale: "Arterial stiffening occurs with aging even in the absence of clinical hypertension. Aging is not responsible for the other conditions."
      },
      {
        question: "What is the major determinant of the resistance that blood encounters as it flows through the systemic circulation?",
        options: ["Volume of blood in the systemic circulation", "Muscle layer of the arterioles", "Muscle layer of the arteries", "Force of ventricular contraction"],
        answer: 2,
        rationale: "Of the options available, only the thick, smooth muscle layer of the arterioles is a major determinant of the resistance blood encounters as it flows through the systemic circulation."
      },
      {
        question: "Which function of the cardiovascular system is often affected by ischemia?",
        options: ["Cardiac output (CO)", "Stroke volume (SV)", "Heart rate (HR)", "Cardiac index (CI)"],
        answer: 2,
        rationale: "Common causes of an abnormal heart rate include ischemia, electrolyte imbalance, and drug toxicity. The other options are related to vascular resistance changes."
      },
      {
        question: "What physical sign is the result of turbulent blood flow through a vessel?",
        options: ["Increased blood pressure during sphygmomanometer measurements", "Bounding pulse felt on palpation", "Cyanosis observed on exertion", "Murmur heard on auscultation"],
        answer: 3,
        rationale: "Where flow is obstructed, the vessel turns or blood flows over rough surfaces. The flow becomes turbulent with whorls or eddy currents that produce noise, causing a murmur to be heard on auscultation, such as occurs during blood pressure measurement with a sphygmomanometer. This selection is the only option that accurately identifies the physical sign of turbulent vascular blood flow."
      },
      {
        question: "What is the major effect of a calcium channel blocker such as verapamil on cardiac contraction?",
        options: ["Increases the rate of cardiac contractions", "Decreases the strength of cardiac contractions", "Stabilizes the rhythm of cardiac contractions", "Stabilizes the vasodilation during cardiac contractions"],
        answer: 1,
        rationale: "The L-type, or long-lasting channels are the predominant type of calcium channels and are the channels blocked by calcium channel–blocking drugs (verapamil, nifedipine, diltiazem). The major effect of these medications is to decrease the strength of cardiac contraction. This selection is the only option that accurately identifies the effect of a calcium channel blocker on the cardiac contractions."
      },
      {
        question: "An early diastolic peak caused by filling of the atrium from peripheral veins is identified by which intracardiac pressure?",
        options: ["A wave", "V wave", "C wave", "X descent"],
        answer: 1,
        rationale: "The V wave is an early diastolic peak caused by the filling of the atrium from the peripheral veins. This event is not identified by any of the other options."
      },
      {
        question: "Which intracardiac pressure is generated by the atrial contraction?",
        options: ["A wave", "C wave", "Y descent", "X descent"],
        answer: 0,
        rationale: "Atrial pressure curves are made up of only three: the A wave, which is generated by atrial contraction."
      },
      {
        question: "Which intracardiac pressure is produced because of the descent of the tricuspid valve ring and by the ejection of blood from both ventricles?",
        options: ["V wave", "C wave", "Y descent", "X descent"],
        answer: 3,
        rationale: "The X descent follows an A wave and is produced because of the descent of the tricuspid valve ring and by the ejection of blood from both ventricles."
      },
      {
        question: "Which statements are true concerning the method in which substances pass between capillaries and the interstitial fluid? (Select all that apply.)",
        options: ["Substances pass through junctions between endothelial cells.", "Substances pass through pores or cell windows (fenestrations).", "Substances pass between vesicles by active transport across the endothelial cell membranes.", "Substances pass across the endothelial cell membrane by osmosis.", "Substances pass through endothelial cell membranes by diffusion."],
        answer: [0, 1, 2, 4],
        rationale: "Substances pass between the capillary lumen and the interstitial fluid in several ways: (1) through junctions between endothelial cells, (2) through fenestrations in endothelial cells, (3) in vesicles or moved by active transport across the endothelial cell membrane, or (4) by diffusion through the endothelial cell membrane."
      },
      {
        question: "Matching: Poiseuille law, Cross-bridge theory, Frank–Starling law, Laplace’s law, Bainbridge reflex",
        options: ["Relationship among blood flow, pressure, and resistance", "Increased heart rate in increased volume", "Relationship of wall tension, intraventricular pressure, internal radius, and wall thickness", "Cycles of attachment, movement, and dissociation of thin filaments during the attachments of actin to myosin", "Length-tension relationship of cardiac muscle"],
        answer: [0, 3, 4, 2, 1],
        rationale: "48. Poiseuille law → Relationship among blood flow, pressure, and resistance; 49. Cross-bridge theory → Cycles of attachment, movement, and dissociation of thin filaments during the attachments of actin to myosin; 50. Frank–Starling law → Length-tension relationship of cardiac muscle; 51. Laplace’s law → Relationship of wall tension, intraventricular pressure, internal radius, and wall thickness; 52. Bainbridge reflex → Increased heart rate in increased volume."
      }
    ]
  }
];

// React app to display practice questions
function App() {
  // Per-chapter shuffle state
  const [chapterShuffled, setChapterShuffled] = useState(false);
  const [chapterShuffledQuestions, setChapterShuffledQuestions] = useState([]);

  function handleChapterShuffle() {
    if (!chapterShuffled) {
      setChapterShuffledQuestions(shuffleArray([...chapters[chapterIdx].questions]));
      setChapterShuffled(true);
      setQuestionIdx(0);
      setSelected(null);
      setShowRationale(false);
    } else {
      setChapterShuffledQuestions([]);
      setChapterShuffled(false);
      setQuestionIdx(0);
      setSelected(null);
      setShowRationale(false);
    }
  }
  // Theme state
  const [darkMode, setDarkMode] = useState(true);
  function handleThemeToggle() {
    setDarkMode(d => !d);
  }
  // Show summary/results page when finished
  const [showSummary, setShowSummary] = useState(false);

  // Bookmark/flag state
  const [bookmarks, setBookmarks] = useState([]); // array of keys

  // Progress tracking state
  const [answered, setAnswered] = useState([]); // [{chapterIdx, questionIdx, correct}]


  const [search, setSearch] = useState("");
  // Filter chapters/questions by search (memoized)
  const filterChapters = React.useCallback((chapters, search) => {
    // Always sort chapters numerically first
    const sortedChapters = [...chapters].sort((a, b) => {
      const aNum = parseInt(a.chapter) || 0;
      const bNum = parseInt(b.chapter) || 0;
      return aNum - bNum;
    });

    if (!search.trim()) return sortedChapters;
    const lower = search.toLowerCase();
    return sortedChapters
      .map(ch => {
        const filteredQuestions = ch.questions.filter(q =>
          q.question.toLowerCase().includes(lower) ||
          q.options.some(opt => opt.toLowerCase().includes(lower))
        );
        if (filteredQuestions.length > 0 || ("" + ch.chapter).includes(lower)) {
          return { ...ch, questions: filteredQuestions };
        }
        return null;
      })
      .filter(Boolean);
  }, []);
  const [chapterIdx, setChapterIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showRationale, setShowRationale] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize for responsive design
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Derived values (memoized)
  const questions = React.useMemo(() => {
    if (shuffle) {
      return shuffledQuestions;
    } else {
      const chapter = chapters[chapterIdx];
      return chapterShuffled ? chapterShuffledQuestions : chapter?.questions || [];
    }
  }, [shuffle, shuffledQuestions, chapterShuffled, chapterShuffledQuestions, chapterIdx]);

  const question = React.useMemo(() => {
    return questions?.[questionIdx] || null;
  }, [questions, questionIdx]);

  const chapter = React.useMemo(() => {
    if (shuffle && question) {
      return { chapter: question.chapter };
    } else {
      return chapters[chapterIdx] || {};
    }
  }, [shuffle, question, chapterIdx]);

  const isMulti = React.useMemo(() => {
    return question ? Array.isArray(question.answer) : false;
  }, [question]);

  const isCorrect = React.useMemo(() => {
    if (!question || !showRationale) return false;
    return isMulti
      ? selected && selected.length === question.answer.length && selected.every(i => question.answer.includes(i))
      : selected === question.answer;
  }, [question, showRationale, isMulti, selected]);

  // Track answer when rationale is shown
  React.useEffect(() => {
    if (showRationale && selected !== null && question) {
      const isMulti = Array.isArray(question.answer);
      const correct = isMulti
        ? selected && selected.length === question.answer.length && selected.every(i => question.answer.includes(i))
        : selected === question.answer;
      const key = shuffle
        ? `${question.chapterIdx}-${question.origIdx}`
        : `${chapterIdx}-${questionIdx}`;
      if (!answered.find(a => a.key === key)) {
        setAnswered(ans => [...ans, { key, correct }]);
      }
    }
  }, [showRationale, selected, answered, chapterIdx, question, questionIdx, shuffle]);

  function getCurrentKey() {
    if (shuffle && question) {
      return `${question.chapterIdx}-${question.origIdx}`;
    } else {
      return `${chapterIdx}-${questionIdx}`;
    }
  }

  function toggleBookmark() {
    const key = getCurrentKey();
    setBookmarks(bm => bm.includes(key) ? bm.filter(k => k !== key) : [...bm, key]);
  }

  const isBookmarked = React.useMemo(() => {
    const key = shuffle && question
      ? `${question.chapterIdx}-${question.origIdx}`
      : `${chapterIdx}-${questionIdx}`;
    return bookmarks.includes(key);
  }, [bookmarks, chapterIdx, questionIdx, shuffle, question]);

  // Helper: flatten all questions with chapter info
  function getAllQuestions() {
    return chapters.flatMap((ch, cIdx) => ch.questions.map((q, qIdx) => ({ ...q, chapter: ch.chapter, chapterIdx: cIdx, origIdx: qIdx })));
  }

  // Shuffle function
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Handle shuffle toggle
  function handleShuffleToggle() {
    setShuffle(s => {
      const newShuffle = !s;
      setQuestionIdx(0);
      setSelected(null);
      setShowRationale(false);
      if (newShuffle) {
        setShuffledQuestions(shuffleArray(getAllQuestions()));
      } else {
        setShuffledQuestions([]);
        setChapterIdx(0);
      }
      return newShuffle;
    });
  }

  // When chapter changes, reset questionIdx if not shuffling
  React.useEffect(() => {
    if (!shuffle) {
      setQuestionIdx(0);
      setSelected(null);
      setShowRationale(false);
    }
  }, [chapterIdx, shuffle]);


  // Progress calculation (memoized)
  const totalQuestions = React.useMemo(() => questions?.length || 0, [questions]);
  const answeredCount = React.useMemo(() => answered.filter(a => {
    if (shuffle && question) {
      return a.key.startsWith(`${question.chapterIdx}-`);
    } else {
      return a.key.startsWith(`${chapterIdx}-`);
    }
  }).length, [answered, shuffle, chapterIdx, question]);
  const correctCount = React.useMemo(() => answered.filter(a => a.correct).length, [answered]);
  const percent = React.useMemo(() => Math.round((answeredCount / totalQuestions) * 100), [answeredCount, totalQuestions]);

  // useEffect to handle summary display
  React.useEffect(() => {
    if (questionIdx === questions.length - 1 && showRationale) {
      setTimeout(() => setShowSummary(true), 800);
    } else {
      setShowSummary(false);
    }
  }, [questionIdx, showRationale, questions.length]);

  function handleSelect(i) {
    setSelected(i);
    setShowRationale(true);
  }
  function handleNext() {
    if (questions && questionIdx < questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
      setSelected(null);
      setShowRationale(false);
    } else if (!shuffle && chapters && chapterIdx < chapters.length - 1) {
      setChapterIdx(chapterIdx + 1);
      setQuestionIdx(0);
      setSelected(null);
      setShowRationale(false);
    }
  }
  function handlePrev() {
    if (questionIdx > 0) {
      setQuestionIdx(questionIdx - 1);
      setSelected(null);
      setShowRationale(false);
    } else if (!shuffle && chapterIdx > 0 && chapters && chapters[chapterIdx - 1]) {
      setChapterIdx(chapterIdx - 1);
      setQuestionIdx(chapters[chapterIdx - 1].questions.length - 1);
      setSelected(null);
      setShowRationale(false);
    }
  }

  return (
    <div style={{ background: '#222', minHeight: '100vh', fontFamily: 'sans-serif', color: '#fff', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Table of Contents Sidebar */}
      <aside style={{
        width: isMobile ? '100%' : 260,
        maxHeight: isMobile ? '30vh' : '100vh',
        overflowY: isMobile ? 'auto' : 'visible',
        background: '#181818',
        padding: isMobile ? '0.8rem' : '2rem 1rem',
        borderRight: isMobile ? 'none' : '1px solid #333',
        borderBottom: isMobile ? '1px solid #333' : 'none',
        minHeight: isMobile ? 'auto' : '100vh'
      }}>
        <h2 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1.5rem' }} id="sidebar-title">Chapters</h2>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search chapters/questions..."
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: 4, border: '1px solid #333', background: '#222', color: '#fff' }}
          aria-label="Search chapters and questions"
        />
        <ul style={{ listStyle: 'none', padding: 0, maxHeight: '60vh', overflowY: 'auto' }} role="listbox" aria-labelledby="sidebar-title">
          {filterChapters(chapters, search).map((ch) => (
            <li key={ch.chapter} role="option" aria-selected={ch.chapter === chapters[chapterIdx]?.chapter}>
              <button
                style={{
                  background: ch.chapter === chapters[chapterIdx]?.chapter ? '#2ecc40' : '#222',
                  color: ch.chapter === chapters[chapterIdx]?.chapter ? '#222' : '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '0.5rem 1rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                  fontWeight: ch.chapter === chapters[chapterIdx]?.chapter ? 'bold' : 'normal',
                  cursor: shuffle ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  transition: 'background 0.2s, color 0.2s',
                  opacity: shuffle ? 0.5 : 1,
                }}
                onClick={() => {
                  if (!shuffle) {
                    // Find the actual chapter index in the original chapters array
                    const actualChapterIdx = chapters.findIndex(chapter => chapter.chapter === ch.chapter);
                    setChapterIdx(actualChapterIdx);
                    setQuestionIdx(0);
                    setSelected(null);
                    setShowRationale(false);
                  }
                }}
                disabled={shuffle}
                aria-label={`Select Chapter ${ch.chapter}`}
                tabIndex={0}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ' ') && !shuffle) {
                    // Find the actual chapter index in the original chapters array
                    const actualChapterIdx = chapters.findIndex(chapter => chapter.chapter === ch.chapter);
                    setChapterIdx(actualChapterIdx);
                    setQuestionIdx(0);
                    setSelected(null);
                    setShowRationale(false);
                  }
                }}
              >
                Chapter {ch.chapter} ({ch.questions.length})
              </button>
            </li>
          ))}
        </ul>
        {shuffle && (
          <div style={{ color: '#bbb', fontSize: '0.95rem', marginTop: '2rem', textAlign: 'center' }}>
            <b>Global Shuffle Active</b><br />
            Chapter navigation is disabled
          </div>
        )}
      </aside>
      {/* Main Content Centered */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'center',
        minHeight: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '0.5rem' : '1rem',
        overflowY: 'auto'
      }}>
          <button
            style={{ position: 'absolute', top: 16, right: 16, background: '#444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 'bold', cursor: 'pointer', zIndex: 10 }}
            onClick={handleThemeToggle}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? 'Switch to Light' : 'Switch to Dark'}
          </button>
          <div>
            {showSummary ? (
              <div style={{ maxWidth: 600, margin: '2rem auto', background: '#181818', borderRadius: 16, boxShadow: '0 2px 16px #0006', padding: '2rem', color: '#fff', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Summary</h2>
                <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Answered: {answeredCount} / {totalQuestions}</div>
                <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Correct: {correctCount}</div>
                <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Score: {Math.round((correctCount / totalQuestions) * 100)}%</div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <strong>Bookmarked Questions:</strong>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0' }}>
                    {bookmarks.map(key => {
                      const [chIdx, qIdx] = key.split('-').map(Number);
                      const ch = chapters[chIdx];
                      const q = ch && ch.questions[qIdx];
                      return q ? (
                        <li key={key} style={{ marginBottom: 4, textAlign: 'left' }}>
                          <span style={{ color: '#2ecc40' }}>Chapter {ch.chapter}:</span> {q.question}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
                <button
                  style={{ background: '#2ecc40', color: '#222', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}
                  onClick={() => { setShowSummary(false); setQuestionIdx(0); setSelected(null); setShowRationale(false); }}
                >
                  Restart
                </button>
              </div>
            ) : (
              <div>
                {/* Progress Bar */}
                <div style={{ width: '100%', maxWidth: 600, margin: '0 auto 1rem auto', padding: '0.5rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>Progress</span>
                  <span style={{ color: '#fff' }}>{answeredCount} / {totalQuestions} answered</span>
                </div>
                <div style={{ background: '#333', borderRadius: 8, height: 18, width: '100%', overflow: 'hidden', marginBottom: 4 }}>
                  <div style={{ background: '#2ecc40', width: `${percent}%`, height: '100%' }}></div>
                </div>
              </div>
              <div style={{ color: '#fff', fontSize: '0.95rem' }}>Correct: {correctCount}</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', width: '100%' }}>
            <h1 style={{ color: '#fff', fontSize: '1.6rem', marginBottom: '0.3rem', textAlign: 'center' }}>Exam App</h1>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Chapter {chapter.chapter}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button
                style={{ padding: '0.4rem 1rem', borderRadius: 8, border: '1px solid #888', background: chapterShuffled ? '#2ecc40' : '#444', color: chapterShuffled ? '#222' : '#fff', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}
                onClick={handleChapterShuffle}
                aria-label={chapterShuffled ? 'Unshuffle chapter questions' : 'Shuffle chapter questions'}
              >
                {chapterShuffled ? 'Unshuffle Chapter' : 'Shuffle Chapter'}
              </button>
              <button
                style={{ padding: '0.4rem 1rem', borderRadius: 8, border: '1px solid #888', background: shuffle ? '#2ecc40' : '#444', color: shuffle ? '#222' : '#fff', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }}
                onClick={handleShuffleToggle}
              >
                {shuffle ? 'Unshuffle Questions' : 'Shuffle Questions'}
              </button>
            </div>
            <div style={{
              marginBottom: isMobile ? '0.5rem' : '1rem',
              padding: isMobile ? '0.8rem' : '1.2rem',
              border: '1px solid rgba(46, 204, 64, 0.3)',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.95) 0%, rgba(34, 34, 34, 0.95) 100%)',
              minWidth: isMobile ? 'auto' : 350,
              maxWidth: isMobile ? '100%' : '95%',
              width: isMobile ? '100%' : '95%',
              minHeight: isMobile ? 'auto' : '75vh',
              height: isMobile ? 'auto' : '75vh',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(46, 204, 64, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '0 auto',
              backdropFilter: 'blur(10px)',
              overflow: 'hidden'
            }}>
              <button
                onClick={toggleBookmark}
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: '0.5rem',
                  background: isBookmarked
                    ? 'linear-gradient(135deg, #2ecc40 0%, #27ae60 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: isBookmarked ? '#fff' : '#ccc',
                  border: isBookmarked ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '0.6rem 1.2rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease',
                  boxShadow: isBookmarked
                    ? '0 4px 15px rgba(46, 204, 64, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') toggleBookmark();
                }}
              >
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              {question && (
                <>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    width: '100%',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                    fontSize: '1.2rem',
                    color: '#fff',
                    marginBottom: '0.8rem',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    padding: '0.6rem',
                    background: 'rgba(46, 204, 64, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(46, 204, 64, 0.3)'
                  }}>
                    <span style={{ color: '#2ecc40', fontSize: '1.1rem', fontWeight: 'bold' }}>Q{questionIdx + 1}:</span> {question.question}
                  </div>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: isMobile ? '0.5rem' : '0.8rem',
                    flex: 1,
                    alignContent: 'start'
                  }}>
                    {question.options.map((opt, i) => {
                  const isSelected = selected === i || (isMulti && selected && selected.includes(i));
                  const isAnswer = isMulti ? question.answer.includes(i) : question.answer === i;
                  return (
                    <li key={i} style={{ margin: 0 }}>
                      <button
                        style={{
                          padding: '0.8rem 1rem',
                          background: isSelected
                            ? (isAnswer && showRationale ? '#2ecc40' : 'rgba(46, 204, 64, 0.2)')
                            : 'rgba(255, 255, 255, 0.05)',
                          border: isSelected
                            ? '2px solid #2ecc40'
                            : '2px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: 12,
                          cursor: showRationale ? 'default' : 'pointer',
                          width: '100%',
                          textAlign: 'left',
                          fontWeight: isSelected ? 'bold' : '500',
                          color: isAnswer && showRationale
                            ? '#2ecc40'
                            : isSelected ? '#fff' : '#e0e0e0',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          boxShadow: isSelected
                            ? '0 4px 15px rgba(46, 204, 64, 0.3)'
                            : '0 2px 8px rgba(0, 0, 0, 0.3)',
                          transform: isSelected ? 'translateY(-1px)' : 'none',
                        }}
                        disabled={showRationale}
                        onMouseEnter={(e) => {
                          if (!showRationale && !isSelected) {
                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            e.target.style.transform = 'translateY(-2px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!showRationale && !isSelected) {
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            e.target.style.transform = 'none';
                          }
                        }}
                        onClick={() => {
                          if (!showRationale) {
                            if (isMulti) {
                              let arr = selected ? [...selected] : [];
                              if (arr.includes(i)) arr = arr.filter(x => x !== i);
                              else arr.push(i);
                              setSelected(arr);
                            } else {
                              handleSelect(i);
                            }
                          }
                        }}
                        aria-label={`Select option ${String.fromCharCode(97 + i)}: ${opt}`}
                        tabIndex={0}
                        onKeyDown={e => {
                          if ((e.key === 'Enter' || e.key === ' ') && !showRationale) {
                            if (isMulti) {
                              let arr = selected ? [...selected] : [];
                              if (arr.includes(i)) arr = arr.filter(x => x !== i);
                              else arr.push(i);
                              setSelected(arr);
                            } else {
                              handleSelect(i);
                            }
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{
                            backgroundColor: isAnswer && showRationale ? '#2ecc40' : 'rgba(46, 204, 64, 0.8)',
                            color: '#222',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            marginRight: '0.8rem',
                            flexShrink: 0
                          }}>
                            {String.fromCharCode(97 + i).toUpperCase()}
                          </span>
                          <span style={{
                            color: isAnswer && showRationale ? '#2ecc40' : (isSelected ? '#fff' : '#e0e0e0'),
                            fontWeight: isAnswer && showRationale ? 'bold' : '500',
                            lineHeight: '1.4'
                          }}>
                            {opt}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                    })}
                  </ul>
                  </div>
                </>
              )}
              {isMulti && !showRationale && (
                <button
                  style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #888', background: '#444', color: '#fff', fontWeight: 'bold' }}
                  onClick={() => setShowRationale(true)}
                  disabled={!selected || selected.length === 0}
                >Submit</button>
              )}
              {showRationale && question && (
                <div style={{ marginTop: '0.8rem', color: '#fff', width: '100%' }}>
                  <div style={{ marginTop: '0.3rem', padding: '0.8rem', background: 'rgba(46, 204, 64, 0.1)', borderRadius: 8, border: '1px solid rgba(46, 204, 64, 0.3)' }}>
                    <span style={{ color: '#2ecc40', fontWeight: 'bold' }}>Rationale:</span> {question.rationale}
                  </div>
                  <div style={{ marginTop: '0.3rem', color: isCorrect ? '#2ecc40' : '#ff4136', fontWeight: 'bold', textAlign: 'center' }}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect.'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '0.6rem' }}>
                    <button style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #888', background: '#444', color: '#fff', fontWeight: 'bold' }} onClick={handleNext}>
                      Next
                    </button>
                    {(questionIdx > 0 || chapterIdx > 0) && (
                      <button style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '1px solid #888', background: '#444', color: '#fff', fontWeight: 'bold' }} onClick={handlePrev}>
                        Previous
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div style={{ fontSize: '1rem', color: '#bbb', marginTop: '1rem', textAlign: 'center' }}>
              {shuffle
                ? `Global Shuffle — Question ${questionIdx + 1} of ${questions.length}`
                : `Chapter ${chapterIdx + 1} of ${chapters.length} — Question ${questionIdx + 1} of ${questions.length}`}
            </div>
          </div>
        </div>
      )}
      </div>
      </main>
    </div>
  );
}

export default App;
